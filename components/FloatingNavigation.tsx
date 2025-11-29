import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react-native';
import { GlassCard } from './ui/GlassCard';

interface FloatingNavigationProps {
  onPreviousChapter?: () => void;
  onNextChapter?: () => void;
  onToggleAudio?: () => void;
  isSpeaking?: boolean;
}

export function FloatingNavigation({
  onPreviousChapter,
  onNextChapter,
  onToggleAudio,
  isSpeaking = false,
}: FloatingNavigationProps) {
  return (
    <View className="absolute bottom-6 left-0 right-0 flex-row justify-between px-6" pointerEvents="box-none">
      {onPreviousChapter ? (
        <TouchableOpacity onPress={onPreviousChapter}>
          <GlassCard style={{ width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={24} color="#D4AF37" />
          </GlassCard>
        </TouchableOpacity>
      ) : <View style={{ width: 50 }} />}

      {onToggleAudio && (
        <TouchableOpacity onPress={onToggleAudio}>
          <GlassCard style={{ width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
            {isSpeaking ? (
              <Pause size={24} color="#D4AF37" fill="#D4AF37" />
            ) : (
              <Play size={24} color="#D4AF37" fill="#D4AF37" style={{ marginLeft: 4 }} />
            )}
          </GlassCard>
        </TouchableOpacity>
      )}

      {onNextChapter ? (
        <TouchableOpacity onPress={onNextChapter}>
          <GlassCard style={{ width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={24} color="#D4AF37" />
          </GlassCard>
        </TouchableOpacity>
      ) : <View style={{ width: 50 }} />}
    </View>
  );
}
