import React from 'react';
import { View, ImageBackground } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface GalaxyBackgroundProps {
  children: React.ReactNode;
}

export function GalaxyBackground({ children }: GalaxyBackgroundProps) {
  const { theme } = useTheme();

  if (theme === 'light') {
    return (
      <View style={{ flex: 1, backgroundColor: '#F5F5F7' }}>
        {children}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} className="bg-galaxy-bg">
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2072&auto=format&fit=crop' }}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-[#0A0A1A]/85" />
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </ImageBackground>
    </View>
  );
}
