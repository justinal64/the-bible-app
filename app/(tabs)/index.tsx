import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { useDailyVerse } from '../../hooks/useDailyVerse';
import { useDailyPrayer } from '../../hooks/useDailyPrayer';
import { ProfileButton } from '../../components/ProfileButton';
import { useUserStreak } from '../../hooks/useUserStreak';
import { Flame } from 'lucide-react-native';

export default function DashboardScreen() {
  const dailyVerse = useDailyVerse();
  const dailyPrayer = useDailyPrayer();
  const { streak } = useUserStreak();

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView contentContainerClassName="pb-24">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8 px-4">
            <View>
              <Text className="text-sm font-medium mb-1 text-text-secondary">Welcome back</Text>
              <Text className="text-2xl font-bold text-text-primary">Home Dashboard</Text>
            </View>
            <View className="flex-row items-center gap-3">
              {streak && (
                <GlassCard style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: 0 }}>
                  <View className="items-center justify-center">
                    <Flame size={16} color="#D4AF37" fill="#D4AF37" />
                    <Text className="text-[10px] font-bold text-gold mt-[2px]">{streak.current_streak}</Text>
                  </View>
                </GlassCard>
              )}
              <ProfileButton />
            </View>
          </View>

          {/* Daily Verse */}
          <View className="px-4 mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-text-primary">Daily Verse</Text>
              <Text className="text-xs text-text-secondary">Today</Text>
            </View>
            <GlassCard style={{ height: 200, padding: 0, overflow: 'hidden' }}>
              <Image
                source={{ uri: dailyVerse.image }}
                className="absolute inset-0 w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/40" />
              <View className="flex-1 justify-end p-6">
                <Text className="text-xl font-serif italic mb-2 text-text-primary" style={{ color: '#FFFFFF' }}>
                  "{dailyVerse.text}"
                </Text>
                <Text className="font-bold text-gold">{dailyVerse.reference}</Text>
              </View>
            </GlassCard>
          </View>

          {/* Daily Prayer */}
          <View className="px-4 mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-text-primary">Daily Prayer</Text>
            </View>
            <GlassCard style={{ padding: 20 }}>
              <Text className="text-lg font-serif italic mb-4 text-text-primary leading-7">
                "{dailyPrayer.text}"
              </Text>
              <Text className="font-bold text-gold text-right">- {dailyPrayer.title}</Text>
            </GlassCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GalaxyBackground>
  );
}
