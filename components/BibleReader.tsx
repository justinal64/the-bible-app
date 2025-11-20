import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { BibleVerse } from '../types/bible';
import { Spacing, BorderRadius } from '../constants/theme';

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
      const mockVerses: BibleVerse[] = Array.from({ length: 20 }, (_, i) => ({
        id: `${bookId}-${chapter}-${i + 1}`,
        translationId,
        bookId,
        chapter,
        verse: i + 1,
        text: `This is verse ${i + 1} of chapter ${chapter}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      }));
      setVerses(mockVerses);
    } catch (error) {
      console.error('Failed to load verses:', error);
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
      padding: Spacing.sm,
      borderRadius: BorderRadius.md,
    },
    verseRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    verseNumber: {
      fontSize: fontSizes.xs,
      color: colors.textSecondary,
      fontWeight: '600',
      marginRight: Spacing.xs,
      marginTop: 2,
      minWidth: 24,
    },
    verseText: {
      flex: 1,
      fontSize: fontSizes.base,
      color: colors.text,
      lineHeight: fontSizes.base * lineSpacingValue,
    },
    highlighted: {
      backgroundColor: colors.highlight.yellow,
    },
    bookmarked: {
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
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
        {verses.map((verse) => {
          const isHighlighted = highlightedVerses.has(verse.verse);
          const isBookmarked = bookmarkedVerses.has(verse.verse);

          return (
            <TouchableOpacity
              key={verse.id}
              style={[
                styles.verseContainer,
                isHighlighted && styles.highlighted,
                isBookmarked && styles.bookmarked,
              ]}
              onPress={() => onVersePress?.(verse.verse)}
              activeOpacity={0.7}
            >
              <View style={styles.verseRow}>
                {verseNumbersVisible && (
                  <Text style={styles.verseNumber}>{verse.verse}</Text>
                )}
                <Text style={styles.verseText}>{verse.text}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
