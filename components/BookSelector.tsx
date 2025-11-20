import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { BIBLE_BOOKS } from '../constants/bibleBooks';
import { Spacing, BorderRadius } from '../constants/theme';

interface BookSelectorProps {
  onSelectBook: (bookId: number) => void;
  currentBookId?: number;
}

export function BookSelector({ onSelectBook, currentBookId }: BookSelectorProps) {
  const { colors, fontSizes } = useTheme();
  const [selectedTestament, setSelectedTestament] = useState<'Old Testament' | 'New Testament'>('Old Testament');

  const oldTestamentBooks = BIBLE_BOOKS.filter(b => b.testament === 'Old Testament');
  const newTestamentBooks = BIBLE_BOOKS.filter(b => b.testament === 'New Testament');
  const displayedBooks = selectedTestament === 'Old Testament' ? oldTestamentBooks : newTestamentBooks;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      padding: Spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
    },
    tabActive: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    tabTextActive: {
      color: '#ffffff',
    },
    bookList: {
      padding: Spacing.md,
    },
    bookItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    bookItemActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    bookName: {
      fontSize: fontSizes.base,
      color: colors.text,
      fontWeight: '500',
    },
    bookNameActive: {
      color: '#ffffff',
    },
    chapterCount: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    chapterCountActive: {
      color: '#ffffff',
      opacity: 0.9,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTestament === 'Old Testament' && styles.tabActive]}
          onPress={() => setSelectedTestament('Old Testament')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTestament === 'Old Testament' && styles.tabTextActive,
            ]}
          >
            Old Testament
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTestament === 'New Testament' && styles.tabActive]}
          onPress={() => setSelectedTestament('New Testament')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTestament === 'New Testament' && styles.tabTextActive,
            ]}
          >
            New Testament
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.bookList}>
        {displayedBooks.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={[styles.bookItem, currentBookId === book.id && styles.bookItemActive]}
            onPress={() => onSelectBook(book.id)}
          >
            <Text
              style={[styles.bookName, currentBookId === book.id && styles.bookNameActive]}
            >
              {book.name}
            </Text>
            <Text
              style={[
                styles.chapterCount,
                currentBookId === book.id && styles.chapterCountActive,
              ]}
            >
              {book.chapterCount} chapters
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
