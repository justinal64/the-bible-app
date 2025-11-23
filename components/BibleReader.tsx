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
      backgroundColor: 'transparent',
    },
    scrollContent: {
      padding: Spacing.md,
      paddingBottom: 100,
    },
    pageContainer: {
      backgroundColor: 'rgba(26, 26, 46, 0.6)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderRadius: 16,
      padding: 20,
      minHeight: 400,
    },
    chapterText: {
      color: '#FFFFFF',
      fontSize: fontSizes.lg,
      lineHeight: fontSizes.lg * 1.8,
      fontFamily: 'System', // Ideally Serif
    },
    verseWrapper: {
      // Inline wrapper
    },
    verseNumber: {
      fontSize: fontSizes.xs,
      color: '#D4AF37', // Gold
      fontWeight: 'bold',
      top: -4, // Superscript effect
    },
    highlightedText: {
      backgroundColor: 'rgba(212, 175, 55, 0.2)',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Spacing.xl,
      paddingTop: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.sm,
    },
    navButtonText: {
      color: '#D4AF37',
      fontSize: fontSizes.base,
      fontWeight: '600',
      marginHorizontal: Spacing.xs,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.pageContainer}>
          <Text style={styles.chapterText}>
            {verses.map((verse) => {
              const isHighlighted = highlightedVerses.has(verse.verse);

              return (
                <Text
                  key={verse.id}
                  onPress={() => onVersePress?.(verse.verse)}
                  style={isHighlighted ? styles.highlightedText : undefined}
                >
                  {verseNumbersVisible && (
                    <Text style={styles.verseNumber}>{verse.verse} </Text>
                  )}
                  {verse.text}{' '}
                </Text>
              );
            })}
          </Text>

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[styles.navButton, { opacity: onPreviousChapter ? 1 : 0.5 }]}
              onPress={onPreviousChapter}
              disabled={!onPreviousChapter}
            >
              <Text style={styles.navButtonText}>← Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, { opacity: onNextChapter ? 1 : 0.5 }]}
              onPress={onNextChapter}
              disabled={!onNextChapter}
            >
              <Text style={styles.navButtonText}>Next →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
