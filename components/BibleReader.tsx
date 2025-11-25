import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { GlassCard } from './ui/GlassCard';
import { useTheme } from '../contexts/ThemeContext';
import { useBibleVerses } from '../hooks/useBibleVerses';

interface BibleReaderProps {
  bookId: number;
  chapter: number;
  translationId: string;
  onVersePress?: (verse: number) => void;
  highlightedVerses?: Set<number>;
  bookmarkedVerses?: Set<number>;
  onNextChapter?: () => void;
  onPreviousChapter?: () => void;
}

export function BibleReader({
  bookId,
  chapter,
  translationId,
  onVersePress,
  highlightedVerses = new Set(),
  bookmarkedVerses = new Set(),
  onNextChapter,
  onPreviousChapter,
}: BibleReaderProps) {
  const { colors, fontSizes, lineSpacingValue, verseNumbersVisible } = useTheme();
  const { verses, loading } = useBibleVerses({ bookId, chapter, translationId });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (!loading) {
      // Reset values
      fadeAnim.setValue(0);
      translateY.setValue(20);

      // Run animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading, chapter, bookId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return (
    <View className="bg-transparent flex-1 relative">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 75 }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}
          className="bg-galaxy-card/60 border border-white/10 rounded-2xl p-5 min-h-[400px]"
        >
          <Text className="text-lg leading-[1.8] font-system">
            {verses.map((verse) => {
              const isHighlighted = highlightedVerses.has(verse.verse);

              return (
                <Text
                  key={verse.id}
                  onPress={() => onVersePress?.(verse.verse)}
                  className={`text-text-primary ${isHighlighted ? "bg-gold/20" : ""}`}
                >
                  {verseNumbersVisible && (
                    <Text className="text-xs font-bold -top-1 !text-gold">{verse.verse} </Text>
                  )}
                  {verse.text}{' '}
                </Text>
              );
            })}
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Floating Navigation Buttons */}
      <View className="absolute bottom-6 left-0 right-0 flex-row justify-between px-6" pointerEvents="box-none">
        {onPreviousChapter ? (
          <TouchableOpacity onPress={onPreviousChapter}>
            <GlassCard style={{ width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={24} color="#D4AF37" />
            </GlassCard>
          </TouchableOpacity>
        ) : <View />}

        {onNextChapter ? (
          <TouchableOpacity onPress={onNextChapter}>
            <GlassCard style={{ width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={24} color="#D4AF37" />
            </GlassCard>
          </TouchableOpacity>
        ) : <View />}
      </View>
    </View>
  );
}
