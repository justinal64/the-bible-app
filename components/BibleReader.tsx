import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, FlatList } from 'react-native';
import { FloatingNavigation } from './FloatingNavigation';
import { useTheme } from '../contexts/ThemeContext';
import { BibleVerse } from '../types/bible';
import { useScrollToVerse } from '../hooks/useScrollToVerse';

interface BibleReaderProps {
  verses: BibleVerse[];
  loading: boolean;
  onVersePress?: (verse: number) => void;
  highlightedVerses?: Set<number>;
  bookmarkedVerses?: Set<number>;
  onNextChapter?: () => void;
  onPreviousChapter?: () => void;
  onToggleAudio?: () => void;
  isSpeaking?: boolean;
}

export function BibleReader({
  verses,
  loading,
  onVersePress,
  highlightedVerses = new Set(),
  bookmarkedVerses = new Set(),
  onNextChapter,
  onPreviousChapter,
  onToggleAudio,
  isSpeaking = false,
  scrollToVerse,
}: BibleReaderProps & { scrollToVerse?: number }) {
  const { fontSizes, lineSpacingValue, verseNumbersVisible } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Scroll to verse when verses load or scrollToVerse changes
  useScrollToVerse({
    flatListRef,
    verses,
    loading,
    scrollToVerse,
  });

  useEffect(() => {
    if (!loading) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, fadeAnim]);

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const progress = contentOffset.y / (contentSize.height - layoutMeasurement.height - paddingToBottom);
    setScrollProgress(Math.min(Math.max(progress, 0), 1));
  };

  const renderItem = ({ item }: { item: BibleVerse }) => {
    const isHighlighted = highlightedVerses.has(item.verse);
    const isTargetVerse = scrollToVerse === item.verse;

    return (
      <TouchableOpacity
        onPress={() => onVersePress?.(item.verse)}
        activeOpacity={0.7}
        className={`mb-2 rounded-lg p-2 ${isHighlighted ? "bg-gold/20" : ""} ${isTargetVerse ? "bg-white/10 border border-gold/30" : ""}`}
      >
        <Text
          style={{ fontSize: fontSizes.base, lineHeight: fontSizes.base * lineSpacingValue }}
          className="text-text-primary"
        >
          {verseNumbersVisible && (
            <Text
              style={{ fontSize: fontSizes.sm }}
              className="font-bold text-gold mr-2"
            >
              {item.verse}{' '}
            </Text>
          )}
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return (
    <View className="bg-transparent flex-1 relative">
      {/* Progress Bar */}
      <View className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-10">
        <View
          className="h-full bg-gold"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </View>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          ref={flatListRef}
          data={verses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100, paddingTop: 20 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
        />
      </Animated.View>

      <FloatingNavigation
        onPreviousChapter={onPreviousChapter}
        onNextChapter={onNextChapter}
        onToggleAudio={onToggleAudio}
        isSpeaking={isSpeaking}
      />
    </View>
  );
}
