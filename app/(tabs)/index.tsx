import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { BibleReader } from '../../components/BibleReader';
import { BookSelector } from '../../components/BookSelector';
import { ChapterSelector } from '../../components/ChapterSelector';
import { TranslationSelector } from '../../components/TranslationSelector';
import { BIBLE_BOOKS } from '../../constants/bibleBooks';
import { ChevronDown, X } from 'lucide-react-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { Button } from '../../components/ui/Button';

export default function ReadScreen() {
  const { colors, fontSizes } = useTheme();
  const [bookId, setBookId] = useState(1);
  const [chapter, setChapter] = useState(1);
  const [translationId, setTranslationId] = useState('de4e12af7f28f599-01'); // KJV
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
      backgroundColor: colors.background,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderBottomWidth: 2,
      borderBottomColor: colors.border,
    },
    selectorRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    selectorButtonWrapper: {
      flex: 1,
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
      backgroundColor: colors.background,
      borderBottomWidth: 2,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: fontSizes.lg,
      color: colors.text,
      fontWeight: '700',
    },
    closeButton: {
      padding: Spacing.xs,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.selectorRow}>
          <View style={styles.selectorButtonWrapper}>
            <TranslationSelector
              selectedTranslationId={translationId}
              onTranslationChange={setTranslationId}
            />
          </View>
          <View style={styles.selectorButtonWrapper}>
            <Button
              title={currentBook?.name || 'Select Book'}
              onPress={() => setShowBookSelector(true)}
              variant="secondary"
              icon={<ChevronDown size={18} color="#FFFFFF" />}
            />
          </View>
          <View style={styles.selectorButtonWrapper}>
            <Button
              title={`Chapter ${chapter}`}
              onPress={() => setShowChapterSelector(true)}
              variant="secondary"
              icon={<ChevronDown size={18} color="#FFFFFF" />}
            />
          </View>
        </View>
      </View>

      <BibleReader
        bookId={bookId}
        chapter={chapter}
        translationId={translationId}
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
              <X size={24} color={colors.textSecondary} />
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
              <X size={24} color={colors.textSecondary} />
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
