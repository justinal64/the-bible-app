import React from 'react';
import { Text, TouchableOpacity, ViewStyle, TextStyle, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  disabled = false,
  icon,
}: ButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  const getContainerClasses = () => {
    const classes = ['flex-row', 'items-center', 'justify-center', 'rounded-xl'];

    // Size
    if (size === 'sm') classes.push('px-4 py-2');
    if (size === 'md') classes.push('px-6 py-3');
    if (size === 'lg') classes.push('px-8 py-4');

    // Variant
    if (variant === 'primary') classes.push('bg-gold border-b-4 border-gold-dark');
    if (variant === 'secondary') classes.push('bg-galaxy-accent border-b-4 border-galaxy-card');
    if (variant === 'danger') classes.push('bg-red-500 border-b-4 border-red-700');
    if (variant === 'outline') classes.push('bg-transparent border-2 border-white/20 border-b-2');
    if (variant === 'ghost') classes.push('bg-transparent');

    if (disabled) classes.push('opacity-50');

    return classes.join(' ');
  };

  const getTextClasses = () => {
    const classes = ['font-bold', 'uppercase', 'tracking-widest', 'text-center'];

    // Size
    if (size === 'sm') classes.push('text-sm');
    if (size === 'md') classes.push('text-base');
    if (size === 'lg') classes.push('text-lg');

    // Color
    if (variant === 'outline') classes.push('text-text-secondary');
    else if (variant === 'ghost') classes.push('text-gold');
    else classes.push('text-white');

    return classes.join(' ');
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      className={getContainerClasses()}
      style={[{ transform: [{ translateY: isPressed ? 2 : 0 }] }, style]}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className={getTextClasses()} style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
