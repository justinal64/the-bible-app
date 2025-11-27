import { useState } from 'react';
import { supabase } from '../lib/supabase';

export interface SearchResult {
  reference: string;
  text: string;
  verseId: string;
}

interface UseBibleSearchProps {
  bibleId?: string; // Default to KJV if not provided
}

export function useBibleSearch({ bibleId = 'de4e12af7f28f599-01' }: UseBibleSearchProps = {}) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const { data, error } = await supabase.functions.invoke('bible-proxy', {
        body: {
          path: `/bibles/${bibleId}/search`,
          params: {
            query: query,
            limit: '20',
            sort: 'relevance'
          }
        }
      });

      if (error) throw error;

      if (data && data.data && data.data.verses) {
        // API.Bible returns verses in data.verses for search
        const formattedResults = data.data.verses.map((v: any) => ({
          reference: v.reference,
          text: v.text,
          verseId: v.id
        }));
        setResults(formattedResults);
      } else {
        setResults([]);
      }

    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search');
    } finally {
      setLoading(false);
    }
  };

  return { search, results, loading, error };
}
