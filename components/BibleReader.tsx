import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, FlatList } from 'react-native';
import { FloatingNavigation } from './FloatingNavigation';
import { useTheme } from '../contexts/ThemeContext';
import { BibleVerse } from '../types/bible';
import { useScrollToVerse } from '../hooks/useScrollToVerse';
import { useReaderNavigation } from '../hooks/useReaderNavigation';

interface BibleReaderProps {
  verses: BibleVerse[];
  loading: boolean;
  onVersePress?: (verse: number) => void;
  highlightedVerses?: Set<number>;
  onToggleAudio?: () => void;
  isSpeaking?: boolean;
}

export function BibleReader({
  verses,
  loading,
  onVersePress,
  highlightedVerses = new Set(),
  onToggleAudio,
  isSpeaking = false,
  scrollToVerse,
}: BibleReaderProps & { scrollToVerse?: number }) {
  const { fontSizes, lineSpacingValue, verseNumbersVisible, colors, theme } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const { handleNextChapter, handlePreviousChapter } = useReaderNavigation();

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

  const renderItem = useCallback(({ item }: { item: BibleVerse }) => {
    const isHighlighted = highlightedVerses.has(item.verse);
    const isTargetVerse = scrollToVerse === item.verse;
    const fontSize = fontSizes.base;
    const lineHeight = fontSize * lineSpacingValue;

    return (
      <TouchableOpacity
        onPress={() => onVersePress?.(item.verse)}
        activeOpacity={0.7}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            backgroundColor: isHighlighted
              ? (theme === 'light' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.2)')
              : isTargetVerse
                ? (theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)')
                : 'transparent',
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginBottom: 4,
            borderRadius: 8,
            borderColor: isTargetVerse ? 'rgba(212, 175, 55, 0.3)' : 'transparent',
            borderWidth: isTargetVerse ? 1 : 0
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize,
              lineHeight,
              fontFamily: 'CrimsonPro-Regular'
            }}
          >
            {verseNumbersVisible && (
              <Text style={{ fontSize: fontSize * 0.6, color: colors.textSecondary, fontWeight: 'bold' }}>
                {item.verse}{' '}
              </Text>
            )}
            {item.text}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }, [highlightedVerses, scrollToVerse, fontSizes, lineSpacingValue, verseNumbersVisible, onVersePress, fadeAnim, colors, theme]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
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
        onPreviousChapter={handlePreviousChapter}
        onNextChapter={handleNextChapter}
        onToggleAudio={onToggleAudio}
        isSpeaking={isSpeaking}
      />
    </View>
  );
}
