import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { BIBLE_BOOKS } from '../constants/bibleBooks';
import { Spacing, BorderRadius } from '../constants/theme';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

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
      padding: Spacing.md,
      gap: Spacing.md,
      backgroundColor: colors.background,
    },
    tabButton: {
      flex: 1,
    },
    bookList: {
      padding: Spacing.md,
      paddingTop: 0,
    },
    bookItem: {
      marginBottom: Spacing.sm,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bookName: {
      fontSize: fontSizes.base,
      color: colors.text,
      fontWeight: '700',
    },
    bookNameActive: {
      color: '#FFFFFF',
    },
    chapterCount: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    chapterCountActive: {
      color: '#FFFFFF',
      opacity: 0.9,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <View style={styles.tabButton}>
          <Button
            title="Old Testament"
            onPress={() => setSelectedTestament('Old Testament')}
            variant={selectedTestament === 'Old Testament' ? 'primary' : 'outline'}
            size="sm"
          />
        </View>
        <View style={styles.tabButton}>
          <Button
            title="New Testament"
            onPress={() => setSelectedTestament('New Testament')}
            variant={selectedTestament === 'New Testament' ? 'primary' : 'outline'}
            size="sm"
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.bookList}>
        {displayedBooks.map((book) => {
          const isActive = currentBookId === book.id;
          return (
            <TouchableOpacity
              key={book.id}
              onPress={() => onSelectBook(book.id)}
              activeOpacity={0.7}
            >
              <Card
                style={[
                  styles.bookItem,
                  isActive && { backgroundColor: colors.secondary, borderColor: colors.secondaryDark },
                ]}
                padding="md"
              >
                <Text style={[styles.bookName, isActive && styles.bookNameActive]}>
                  {book.name}
                </Text>
                <Text style={[styles.chapterCount, isActive && styles.chapterCountActive]}>
                  {book.chapterCount} chapters
                </Text>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
