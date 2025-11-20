import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { UserNote } from '../types/bible';
import { BIBLE_BOOKS } from '../constants/bibleBooks';
import { FileText, Trash2 } from 'lucide-react-native';
import { Spacing, BorderRadius } from '../constants/theme';

interface NotesListProps {
  notes: UserNote[];
  onNotePress: (note: UserNote) => void;
  onDeleteNote: (noteId: string) => void;
}

export function NotesList({ notes, onNotePress, onDeleteNote }: NotesListProps) {
  const { colors, fontSizes } = useTheme();

  const getBookName = (bookId: number) => {
    return BIBLE_BOOKS.find(b => b.id === bookId)?.name || '';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    noteItem: {
      padding: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    noteHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: Spacing.sm,
    },
    noteHeaderLeft: {
      flex: 1,
    },
    noteTitle: {
      fontSize: fontSizes.base,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    reference: {
      fontSize: fontSizes.sm,
      color: colors.primary,
      fontWeight: '500',
    },
    noteContent: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      marginBottom: Spacing.sm,
      lineHeight: fontSizes.sm * 1.5,
    },
    noteFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    date: {
      fontSize: fontSizes.xs,
      color: colors.textTertiary,
    },
    deleteButton: {
      padding: Spacing.sm,
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
      marginTop: Spacing.md,
    },
  });

  if (notes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FileText size={48} color={colors.textTertiary} />
        <Text style={styles.emptyText}>No notes yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.noteItem} onPress={() => onNotePress(item)}>
          <View style={styles.noteHeader}>
            <View style={styles.noteHeaderLeft}>
              <Text style={styles.noteTitle}>{item.title || 'Untitled'}</Text>
              <Text style={styles.reference}>
                {getBookName(item.bookId)} {item.chapter}
                {item.verse ? `:${item.verse}` : ''}
              </Text>
            </View>
          </View>
          <Text style={styles.noteContent} numberOfLines={3}>
            {item.content}
          </Text>
          <View style={styles.noteFooter}>
            <Text style={styles.date}>
              {new Date(item.updatedAt).toLocaleDateString()}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDeleteNote(item.id)}
            >
              <Trash2 size={18} color={colors.error} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
