import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface SearchHistoryItem {
  id: string;
  query: string;
  result_count: number;
  created_at: string;
}

export function useSearchHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!user) {
      setHistory([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching search history:', error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const saveSearch = useCallback(async (query: string, resultCount: number = 0) => {
    if (!user || !query.trim()) return;

    try {
      const { error } = await supabase
        .from('search_history')
        .insert({
          user_id: user.id,
          query: query.trim(),
          result_count: resultCount,
        });

      if (error) throw error;

      // Refresh history after saving
      await fetchHistory();
    } catch (error) {
      console.error('Error saving search:', error);
    }
  }, [user, fetchHistory]);

  const clearHistory = useCallback(async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setHistory([]);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    saveSearch,
    clearHistory,
    refreshHistory: fetchHistory,
  };
}
