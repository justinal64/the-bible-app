import React from 'react';
import { View, Text } from 'react-native';
import { GlassCard } from './ui/GlassCard';
import { ProfileButton } from './ProfileButton';
import { Flame } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardHeaderProps {
  streak?: {
    current_streak: number;
  } | null;
}

export function DashboardHeader({ streak }: DashboardHeaderProps) {
  const { colors } = useTheme();

  return (
    <View className="flex-row justify-between items-center mb-8 px-4">
      <View>
        <Text className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Welcome back</Text>
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>Home Dashboard</Text>
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
  );
}
