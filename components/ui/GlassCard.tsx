import React from 'react';
import { View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}

import { useTheme } from '../../contexts/ThemeContext';

export function GlassCard({
  children,
  style,
  intensity = 20,
  tint
}: GlassCardProps) {
  const { theme } = useTheme();

  // Default tint based on theme if not provided
  const resolvedTint = tint || (theme === 'light' ? 'light' : 'dark');

  const containerClasses = theme === 'light'
    ? "rounded-2xl overflow-hidden bg-white/70 border border-black/5"
    : "rounded-2xl overflow-hidden bg-galaxy-card/60 border border-white/10";

  return (
    <View className={containerClasses} style={style}>
      <BlurView intensity={intensity} tint={resolvedTint} className="absolute inset-0" />
      <View className="p-4">
        {children}
      </View>
    </View>
  );
}
