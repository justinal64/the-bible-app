import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { getUserStreak, startStreak, restartStreak } from '../lib/streak';

export interface UserStreak {
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_visit_date: string;
}

export function useUserStreak() {
  const { user } = useAuth();
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [loading, setLoading] = useState(false);

  const checkAndUpdateStreak = useCallback(async () => {
    if (!user) {
      setStreak(null);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await getUserStreak(user.id);

      if (error) {
        throw error;
      }

      if (!data) {
        const { data: newStreak, error: createError } = await startStreak(user.id);

        if (createError) throw createError;
        setStreak(newStreak);
      } else {
        // Streak record exists, check dates
        const lastVisit = data.last_visit_date;
        const today = new Date().toISOString().split('T')[0];

        if (lastVisit === today) {
          // Already visited today, just set state
          setStreak(data);
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          let newCurrentStreak = 1;
          if (lastVisit === yesterdayStr) {
            // Visited yesterday, increment streak
            newCurrentStreak = data.current_streak + 1;
          }
          // If last visit was older than yesterday, streak resets to 1 (default)

          const newLongestStreak = Math.max(newCurrentStreak, data.longest_streak);

          const { data: updatedStreak, error: updateError } = await restartStreak(user.id, newCurrentStreak, newLongestStreak);

          if (updateError) throw updateError;
          setStreak(updatedStreak);
        }
      }
    } catch (error) {
      console.error('Error checking/updating streak:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);

  return {
    streak,
    loading,
    refreshStreak: checkAndUpdateStreak,
  };
}
