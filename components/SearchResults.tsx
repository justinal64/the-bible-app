import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { BibleVerse } from '../types/bible';
import { BIBLE_BOOKS } from '../constants/bibleBooks';
import { Spacing, BorderRadius } from '../constants/theme';

interface SearchResult extends BibleVerse {
  bookName: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onResultPress: (bookId: number, chapter: number, verse: number) => void;
}

export function SearchResults({ results, onResultPress }: SearchResultsProps) {
  const { colors, fontSizes } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    resultItem: {
      padding: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    reference: {
      fontSize: fontSizes.sm,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    verseText: {
      fontSize: fontSizes.base,
      color: colors.text,
      lineHeight: fontSizes.base * 1.5,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacing['2xl'],
    },
    emptyText: {
      fontSize: fontSizes.base,
      color: colors.textSecondary,
    },
  });

  if (results.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No results found</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.resultItem}
          onPress={() => onResultPress(item.bookId, item.chapter, item.verse)}
        >
          <Text style={styles.reference}>
            {item.bookName} {item.chapter}:{item.verse}
          </Text>
          <Text style={styles.verseText}>{item.text}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
