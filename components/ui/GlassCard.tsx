import React from 'react';
import { View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}

export function GlassCard({
  children,
  style,
  intensity = 20,
  tint = 'dark'
}: GlassCardProps) {
  return (
    <View className="rounded-2xl overflow-hidden bg-galaxy-card/60 border border-white/10" style={style}>
      <BlurView intensity={intensity} tint={tint} className="absolute inset-0" />
      <View className="p-4">
        {children}
      </View>
    </View>
  );
}
