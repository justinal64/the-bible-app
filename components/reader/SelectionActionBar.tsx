import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { X, Copy, Share as ShareIcon } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { GlassCard } from '../ui/GlassCard';

interface SelectionActionBarProps {
  selectionCount: number;
  onClearSelection: () => void;
  onCopy: () => void;
  onShare: () => void;
}

export function SelectionActionBar({
  selectionCount,
  onClearSelection,
  onCopy,
  onShare,
}: SelectionActionBarProps) {
  const { colors, theme } = useTheme();

  if (selectionCount === 0) return null;

  return (
    <View className="absolute bottom-8 left-4 right-4 z-50">
      <GlassCard style={{ padding: 12, borderRadius: 16 }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={onClearSelection} className="mr-4 p-2">
              <X size={24} color={colors.text} />
            </TouchableOpacity>
            <Text className="font-bold text-lg" style={{ color: colors.text }}>
              {selectionCount} selected
            </Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={onShare}
              className="flex-row items-center bg-gold/20 px-4 py-2 rounded-full"
              style={{ backgroundColor: theme === 'light' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.2)' }}
            >
              <ShareIcon size={20} color="#D4AF37" className="mr-2" />
              <Text className="font-bold text-gold ml-2">Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCopy}
              className="flex-row items-center bg-gold/20 px-4 py-2 rounded-full"
              style={{ backgroundColor: theme === 'light' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.2)' }}
            >
              <Copy size={20} color="#D4AF37" className="mr-2" />
              <Text className="font-bold text-gold ml-2">Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GlassCard>
    </View>
  );
}
