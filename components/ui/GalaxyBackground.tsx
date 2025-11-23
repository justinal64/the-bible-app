import React from 'react';
import { View, ImageBackground } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface GalaxyBackgroundProps {
  children: React.ReactNode;
}

export function GalaxyBackground({ children }: GalaxyBackgroundProps) {
  const { colors } = useTheme();

  return (
    <View className="flex-1 bg-galaxy-bg">
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2072&auto=format&fit=crop' }}
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-[#0A0A1A]/85" />
        <View className="flex-1">
          {children}
        </View>
      </ImageBackground>
    </View>
  );
}
