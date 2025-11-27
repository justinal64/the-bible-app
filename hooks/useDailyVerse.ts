import { useState, useEffect } from 'react';
import { DAILY_VERSES, DailyVerse } from '../constants/dailyVerses';

export function useDailyVerse() {
  const [dailyVerse, setDailyVerse] = useState<DailyVerse>(DAILY_VERSES[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * DAILY_VERSES.length);
    setDailyVerse(DAILY_VERSES[randomIndex]);
  }, []);

  return dailyVerse;
}
