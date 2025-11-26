import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { ReadingPlan } from '../types/bible';
import { BookOpen, Calendar } from 'lucide-react-native';

interface ReadingPlanCardProps {
  plan: ReadingPlan;
  progress?: number;
  onPress: () => void;
}

export function ReadingPlanCard({ plan, progress = 0, onPress }: ReadingPlanCardProps) {
  const { colors, fontSizes } = useTheme();

  return (
    <TouchableOpacity
      className="p-4 bg-galaxy-card rounded-2xl mb-4 border border-white/10"
      onPress={onPress}
    >
      <View className="flex-row items-center mb-2">
        <View className="w-10 h-10 rounded-xl bg-gold justify-center items-center mr-4">
          <BookOpen size={20} color="#ffffff" />
        </View>
        <View className="flex-1">
          <Text className="text-lg text-white font-bold mb-1">{plan.name}</Text>
          <Text className="text-xs text-text-secondary uppercase font-bold">{plan.category}</Text>
        </View>
      </View>
      <Text className="text-sm text-text-secondary leading-6 mb-4" numberOfLines={2}>
        {plan.description}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Calendar size={16} color="#A0A0B0" />
          <Text className="text-sm text-text-secondary ml-1">{plan.durationDays} days</Text>
        </View>
        {progress > 0 && (
          <View className="flex-1 ml-4">
            <View className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <View className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }} />
            </View>
            <Text className="text-xs text-text-tertiary mt-1">{Math.round(progress)}% complete</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
