import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import { BibleVerse } from '../types/bible';
import { BOOK_ID_TO_CODE } from '../utils/bibleMapping';
import { Spacing, BorderRadius } from '../constants/theme';
import { Card } from './ui/Card';

interface BibleReaderProps {
  bookId: number;
  chapter: number;
  translationId: string;
  onVersePress?: (verse: number) => void;
  highlightedVerses?: Set<number>;
  bookmarkedVerses?: Set<number>;
}

export function BibleReader({
  bookId,
  chapter,
  translationId,
  onVersePress,
  highlightedVerses = new Set(),
  bookmarkedVerses = new Set(),
}: BibleReaderProps) {
  const { colors, fontSizes, lineSpacingValue, verseNumbersVisible } = useTheme();
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVerses();
  }, [bookId, chapter, translationId]);

  const loadVerses = async () => {
    setLoading(true);
    try {
      const bookCode = BOOK_ID_TO_CODE[bookId];
      if (!bookCode) throw new Error(`Invalid book ID: ${bookId}`);

      const { data, error } = await supabase.functions.invoke('bible-proxy', {
        body: {
          path: `/bibles/${translationId}/chapters/${bookCode}.${chapter}`,
          params: { 'content-type': 'json' }
        }
      });

      if (error) throw error;

      // The Edge Function now returns the parsed verses directly
      // structure: { data: [{ id, verse, text }, ...] }
      const apiVerses = data.data.map((item: any) => ({
        id: item.id,
        translationId,
        bookId,
        chapter,
        verse: item.verse,
        text: item.text,
      }));

      setVerses(apiVerses);
    } catch (error) {
      console.error('Failed to load verses:', error);
      // Fallback to mock data for now if API fails (or if key is missing)
      const mockVerses: BibleVerse[] = Array.from({ length: 20 }, (_, i) => ({
        id: `${bookId}-${chapter}-${i + 1}`,
        translationId,
        bookId,
        chapter,
        verse: i + 1,
        text: `This is verse ${i + 1} of chapter ${chapter}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      }));
      setVerses(mockVerses);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: Spacing.md,
    },
    verseContainer: {
      marginBottom: Spacing.md,
    },
    verseRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    verseNumber: {
      fontSize: fontSizes.xs,
      color: colors.textSecondary,
      fontWeight: '700',
      marginRight: Spacing.sm,
      marginTop: 4,
      minWidth: 24,
    },
    verseText: {
      flex: 1,
      fontSize: fontSizes.base,
      color: colors.text,
      lineHeight: fontSizes.base * lineSpacingValue,
      fontWeight: '500',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {verses.map((verse, index) => {
          const isHighlighted = highlightedVerses.has(verse.verse);
          const isBookmarked = bookmarkedVerses.has(verse.verse);

          return (
            <Animated.View
              key={verse.id}
              entering={FadeInDown.delay(index * 50).springify().damping(12)}
              layout={Layout.springify()}
            >
              <TouchableOpacity
                onPress={() => onVersePress?.(verse.verse)}
                activeOpacity={0.9}
              >
                <Card
                  style={[
                    styles.verseContainer,
                    isHighlighted && { backgroundColor: colors.highlight.yellow, borderColor: colors.warning },
                    isBookmarked && { borderLeftWidth: 6, borderLeftColor: colors.primary },
                  ]}
                  padding="md"
                  variant={isHighlighted ? 'elevated' : 'default'}
                >
                  <View style={styles.verseRow}>
                    {verseNumbersVisible && (
                      <Text style={styles.verseNumber}>{verse.verse}</Text>
                    )}
                    <Text style={styles.verseText}>{verse.text}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}
