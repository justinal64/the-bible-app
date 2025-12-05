import React from 'react';
import { View, Text, Image } from 'react-native';
import { GlassCard } from './ui/GlassCard';
import { useTheme } from '../contexts/ThemeContext';

interface DailyVerseCardProps {
  verse: {
    text: string;
    reference: string;
    image: string;
  };
}

export function DailyVerseCard({ verse }: DailyVerseCardProps) {
  const { colors } = useTheme();

  return (
    <View className="px-4 mb-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold" style={{ color: colors.text }}>Daily Verse</Text>
        <Text className="text-xs" style={{ color: colors.textSecondary }}>Today</Text>
      </View>
      <GlassCard style={{ height: 200, padding: 0, overflow: 'hidden' }}>
        <Image
          source={{ uri: verse.image }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/40" />
        <View className="flex-1 justify-end p-6">
          <Text className="text-xl font-serif italic mb-2 text-white" style={{ color: colors.text }}>
            "{verse.text}"
          </Text>
          <Text className="font-bold text-gold">{verse.reference}</Text>
        </View>
      </GlassCard>
    </View>
  );
}
