import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Settings } from 'lucide-react-native';
import { UserAvatar } from './UserAvatar';
import { GlassCard } from './ui/GlassCard';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface ProfileButtonProps {
  variant?: 'default' | 'small';
}

export function ProfileButton({ variant = 'default' }: ProfileButtonProps) {
  const { user } = useAuth();
  const { colors, theme } = useTheme();

  if (user) {
    return <UserAvatar />;
  }

  return (
    <GlassCard style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
      <Settings size={20} color={colors.primary} />
    </GlassCard>
  );
}
