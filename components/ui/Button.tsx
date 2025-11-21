import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Animated, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Spacing, BorderRadius, FontSizes } from '../../constants/theme';

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
  const { colors } = useTheme();
  const [isPressed, setIsPressed] = React.useState(false);

  const getBackgroundColor = () => {
    if (disabled) return colors.textTertiary;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'danger':
        return colors.error;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return colors.textTertiary;
    switch (variant) {
      case 'primary':
        return colors.primaryDark;
      case 'secondary':
        return colors.secondaryDark;
      case 'danger':
        return '#D32F2F'; // Darker red
      case 'outline':
        return colors.border;
      case 'ghost':
        return 'transparent';
      default:
        return colors.primaryDark;
    }
  };

  const getTextColor = () => {
    if (disabled) return '#FFFFFF';
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return '#FFFFFF';
      case 'outline':
        return colors.textSecondary;
      case 'ghost':
        return colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md };
      case 'md':
        return { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg };
      case 'lg':
        return { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl };
      default:
        return { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return FontSizes.medium.sm;
      case 'md':
        return FontSizes.medium.base;
      case 'lg':
        return FontSizes.medium.lg;
      default:
        return FontSizes.medium.base;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: getBackgroundColor(),
      borderRadius: BorderRadius.xl,
      borderWidth: variant === 'ghost' ? 0 : 2,
      borderColor: variant === 'outline' ? colors.border : getBackgroundColor(),
      borderBottomWidth: variant === 'ghost' || variant === 'outline' ? 2 : 4,
      borderBottomColor: getBorderColor(),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.6 : 1,
      transform: [{ translateY: isPressed ? 2 : 0 }],
      ...getPadding(),
      ...style,
    },
    text: {
      color: getTextColor(),
      fontSize: getFontSize(),
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1,
      textAlign: 'center',
      ...textStyle,
    },
    iconContainer: {
      marginRight: Spacing.sm,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      style={styles.container}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
