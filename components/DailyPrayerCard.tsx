import React from 'react';
import { View, Text } from 'react-native';
import { GlassCard } from './ui/GlassCard';
import { useTheme } from '../contexts/ThemeContext';

interface DailyPrayerCardProps {
  prayer: {
    text: string;
    title: string;
  };
}

export function DailyPrayerCard({ prayer }: DailyPrayerCardProps) {
  const { colors } = useTheme();

  return (
    <View className="px-4 mb-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold" style={{ color: colors.text }}>Daily Prayer</Text>
      </View>
      <GlassCard style={{ padding: 20 }}>
        <Text className="text-lg font-serif italic mb-4 leading-7" style={{ color: colors.text }}>
          "{prayer.text}"
        </Text>
        <Text className="font-bold text-gold text-right">- {prayer.title}</Text>
      </GlassCard>
    </View>
  );
}
