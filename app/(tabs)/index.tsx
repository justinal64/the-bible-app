import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { BibleReader } from '../../components/BibleReader';
import { BookSelector } from '../../components/BookSelector';
import { ChapterSelector } from '../../components/ChapterSelector';
import { BIBLE_BOOKS } from '../../constants/bibleBooks';
import { ChevronDown } from 'lucide-react-native';
import { Spacing, BorderRadius } from '../../constants/theme';

export default function ReadScreen() {
  const { colors, fontSizes } = useTheme();
  const [bookId, setBookId] = useState(1);
  const [chapter, setChapter] = useState(1);
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showChapterSelector, setShowChapterSelector] = useState(false);

  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId);

  const handleBookSelect = (newBookId: number) => {
    setBookId(newBookId);
    setChapter(1);
    setShowBookSelector(false);
  };

  const handleChapterSelect = (newChapter: number) => {
    setChapter(newChapter);
    setShowChapterSelector(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    selectorRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    selectorButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      backgroundColor: colors.surfaceSecondary,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    selectorText: {
      fontSize: fontSizes.base,
      color: colors.text,
      fontWeight: '600',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: fontSizes.lg,
      color: colors.text,
      fontWeight: '600',
    },
    closeButton: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    closeButtonText: {
      fontSize: fontSizes.base,
      color: colors.primary,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.selectorRow}>
          <TouchableOpacity
            style={styles.selectorButton}
            onPress={() => setShowBookSelector(true)}
          >
            <Text style={styles.selectorText}>{currentBook?.name}</Text>
            <ChevronDown size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectorButton}
            onPress={() => setShowChapterSelector(true)}
          >
            <Text style={styles.selectorText}>Chapter {chapter}</Text>
            <ChevronDown size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <BibleReader
        bookId={bookId}
        chapter={chapter}
        translationId="niv"
        onVersePress={(verse) => console.log('Verse pressed:', verse)}
      />

      <Modal
        visible={showBookSelector}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer} edges={['top']}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Book</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowBookSelector(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          <BookSelector onSelectBook={handleBookSelect} currentBookId={bookId} />
        </SafeAreaView>
      </Modal>

      <Modal
        visible={showChapterSelector}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer} edges={['top']}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Chapter</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowChapterSelector(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          <ChapterSelector
            totalChapters={currentBook?.chapterCount || 1}
            currentChapter={chapter}
            onSelectChapter={handleChapterSelect}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
