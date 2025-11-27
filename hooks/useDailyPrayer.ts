import { useState, useEffect } from 'react';
import { DAILY_PRAYERS, DailyPrayer } from '../constants/dailyPrayers';

export function useDailyPrayer() {
  const [dailyPrayer, setDailyPrayer] = useState<DailyPrayer>(DAILY_PRAYERS[0]);

  useEffect(() => {
    const randomPrayerIndex = Math.floor(Math.random() * DAILY_PRAYERS.length);
    setDailyPrayer(DAILY_PRAYERS[randomPrayerIndex]);
  }, []);

  return dailyPrayer;
}
