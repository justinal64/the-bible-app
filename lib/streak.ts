import { supabase } from "./supabase";

async function getUserStreak(userId: string) {
    const { data, error } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

      return {data, error};
}

async function startStreak(userId: string) {
    const { data, error } = await supabase
      .from('user_streaks')
      .insert({
        user_id: userId,
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        current_streak: 1,
        best_streak: 1,
      })
      .single();

      return {data, error};
}

async function restartStreak(userId: string, currentStreak: number, longestStreak: number) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('user_streaks')
    .update({
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_visit_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  return { data, error };
}


export {getUserStreak, startStreak, restartStreak}
