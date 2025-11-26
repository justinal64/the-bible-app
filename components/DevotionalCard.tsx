import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Devotional } from '../types/bible';
import { Heart } from 'lucide-react-native';

interface DevotionalCardProps {
  devotional: Devotional;
  onPress: () => void;
}

export function DevotionalCard({ devotional, onPress }: DevotionalCardProps) {
  const { colors, fontSizes } = useTheme();

  return (
    <TouchableOpacity
      className="p-4 bg-galaxy-card rounded-2xl mb-4 border border-white/10"
      onPress={onPress}
    >
      <View className="flex-row items-center mb-4">
        <View className="w-10 h-10 rounded-xl bg-red-500 justify-center items-center mr-4">
          <Heart size={20} color="#ffffff" fill="#ffffff" />
        </View>
        <View className="flex-1">
          <Text className="text-lg text-white font-bold mb-1">{devotional.title}</Text>
          <Text className="text-sm text-gold font-medium">{devotional.scriptureReference}</Text>
        </View>
      </View>
      <Text className="text-sm text-text-secondary leading-6 mb-4" numberOfLines={4}>
        {devotional.content}
      </Text>
      <View className="flex-row justify-between items-center pt-2 border-t border-white/10">
        {devotional.author && <Text className="text-xs text-text-tertiary italic">by {devotional.author}</Text>}
        <Text className="text-xs text-text-tertiary">
          {new Date(devotional.publishDate).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
