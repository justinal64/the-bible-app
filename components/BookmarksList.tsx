import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { UserBookmark } from '../types/bible';
import { BIBLE_BOOKS } from '../constants/bibleBooks';
import { Bookmark, Trash2 } from 'lucide-react-native';
import { Spacing, BorderRadius } from '../constants/theme';

interface BookmarksListProps {
  bookmarks: UserBookmark[];
  onBookmarkPress: (bookmark: UserBookmark) => void;
  onDeleteBookmark: (bookmarkId: string) => void;
}

export function BookmarksList({
  bookmarks,
  onBookmarkPress,
  onDeleteBookmark,
}: BookmarksListProps) {
  const { colors, fontSizes } = useTheme();

  const getBookName = (bookId: number) => {
    return BIBLE_BOOKS.find(b => b.id === bookId)?.name || '';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    bookmarkItem: {
      flexDirection: 'row',
      padding: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: Spacing.md,
    },
    contentContainer: {
      flex: 1,
    },
    reference: {
      fontSize: fontSizes.base,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    note: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      marginTop: Spacing.xs,
    },
    date: {
      fontSize: fontSizes.xs,
      color: colors.textTertiary,
    },
    deleteButton: {
      padding: Spacing.sm,
      marginLeft: Spacing.sm,
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
      textAlign: 'center',
    },
  });

  if (bookmarks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Bookmark size={48} color={colors.textTertiary} />
        <Text style={styles.emptyText}>No bookmarks yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={bookmarks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.bookmarkItem}>
          <View style={styles.iconContainer}>
            <Bookmark size={20} color={colors.primary} fill={colors.primary} />
          </View>
          <TouchableOpacity
            style={styles.contentContainer}
            onPress={() => onBookmarkPress(item)}
          >
            <Text style={styles.reference}>
              {getBookName(item.bookId)} {item.chapter}:{item.verse}
            </Text>
            {item.note && <Text style={styles.note}>{item.note}</Text>}
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDeleteBookmark(item.id)}
          >
            <Trash2 size={18} color={colors.error} />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
