import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard } from './ui/GlassCard';

export function UserAvatar() {
  const { user } = useAuth();

  if (!user || !user.email) return null;

  const metadata = user.user_metadata;
  let initial = user.email.charAt(0).toUpperCase();

  if (metadata?.first_name && metadata?.last_name) {
    initial = `${metadata.first_name.charAt(0)}${metadata.last_name.charAt(0)}`.toUpperCase();
  } else if (metadata?.first_name) {
    initial = metadata.first_name.charAt(0).toUpperCase();
  }

  return (
    <GlassCard style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: 0, backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
      <Text className="text-gold font-bold text-lg">{initial}</Text>
    </GlassCard>
  );
}
