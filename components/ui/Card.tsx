import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, style, variant = 'default', padding = 'md' }: CardProps) {
  const getContainerClasses = () => {
    const classes = ['bg-galaxy-card', 'rounded-xl', 'border-2', 'border-white/10', 'border-b-4'];

    // Padding
    if (padding === 'sm') classes.push('p-2');
    if (padding === 'md') classes.push('p-4');
    if (padding === 'lg') classes.push('p-6');

    return classes.join(' ');
  };

  return <View className={getContainerClasses()} style={style}>{children}</View>;
}
