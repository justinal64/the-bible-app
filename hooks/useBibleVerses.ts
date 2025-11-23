import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BibleVerse } from '../types/bible';
import { BOOK_ID_TO_CODE } from '../utils/bibleMapping';

interface UseBibleVersesProps {
  bookId: number;
  chapter: number;
  translationId: string;
}

export function useBibleVerses({ bookId, chapter, translationId }: UseBibleVersesProps) {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadVerses();
  }, [bookId, chapter, translationId]);

  const loadVerses = async () => {
    setLoading(true);
    setError(null);
    try {
      const bookCode = BOOK_ID_TO_CODE[bookId];
      if (!bookCode) throw new Error(`Invalid book ID: ${bookId}`);

      const { data, error } = await supabase.functions.invoke('bible-proxy', {
        body: {
          path: `/bibles/${translationId}/chapters/${bookCode}.${chapter}`,
          params: { 'content-type': 'json' }
        }
      });

      if (error) throw error;

      const apiVerses = data.data.map((item: any) => ({
        id: item.id,
        translationId,
        bookId,
        chapter,
        verse: item.verse,
        text: item.text,
      }));

      setVerses(apiVerses);
    } catch (err) {
      console.error('Failed to load verses:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return { verses, loading, error, refetch: loadVerses };
}
