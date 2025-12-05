import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { DashboardHeader } from '../../components/DashboardHeader';
import { DailyVerseCard } from '../../components/DailyVerseCard';
import { DailyPrayerCard } from '../../components/DailyPrayerCard';
import { useDailyVerse } from '../../hooks/useDailyVerse';
import { useDailyPrayer } from '../../hooks/useDailyPrayer';
import { useUserStreak } from '../../hooks/useUserStreak';

export default function DashboardScreen() {
  const dailyVerse = useDailyVerse();
  const dailyPrayer = useDailyPrayer();
  const { streak } = useUserStreak();

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView contentContainerClassName="pb-24">
          <DashboardHeader streak={streak} />
          <DailyVerseCard verse={dailyVerse} />
          <DailyPrayerCard prayer={dailyPrayer} />
        </ScrollView>
      </SafeAreaView>
    </GalaxyBackground>
  );
}
