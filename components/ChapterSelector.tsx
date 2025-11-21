import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing } from '../constants/theme';
import { Button } from './ui/Button';

interface ChapterSelectorProps {
  totalChapters: number;
  currentChapter: number;
  onSelectChapter: (chapter: number) => void;
}

export function ChapterSelector({
  totalChapters,
  currentChapter,
  onSelectChapter,
}: ChapterSelectorProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingVertical: Spacing.md,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: Spacing.sm,
      justifyContent: 'center',
      gap: Spacing.sm,
    },
    chapterButtonWrapper: {
      width: 60,
      height: 60,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map((chapter) => (
          <View key={chapter} style={styles.chapterButtonWrapper}>
            <Button
              title={chapter.toString()}
              onPress={() => onSelectChapter(chapter)}
              variant={currentChapter === chapter ? 'primary' : 'outline'}
              size="sm"
              style={{ width: '100%', height: '100%', paddingHorizontal: 0, paddingVertical: 0 }}
              textStyle={{ fontSize: 16 }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
