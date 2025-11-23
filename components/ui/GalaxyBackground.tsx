import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';

interface GalaxyBackgroundProps {
  children: React.ReactNode;
}

export function GalaxyBackground({ children }: GalaxyBackgroundProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0A1A', '#1A1A2E', '#050510']}
        locations={[0, 0.5, 1]}
        style={styles.background}
      />
      {/* Optional: Add stars or subtle overlay here if needed later */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
});
