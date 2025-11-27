import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { useAuth } from '../contexts/AuthContext';
import { UserAvatar } from './UserAvatar';
import { GlassCard } from './ui/GlassCard';

interface ProfileButtonProps {
  variant?: 'glass' | 'default';
}

export function ProfileButton({ variant = 'default' }: ProfileButtonProps) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push('/settings')}>
      {user ? (
        <UserAvatar />
      ) : (
        variant === 'glass' ? (
          <GlassCard style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
            <Settings size={20} color="#D4AF37" />
          </GlassCard>
        ) : (
          <Settings size={24} color="#FFFFFF" />
        )
      )}
    </TouchableOpacity>
  );
}
