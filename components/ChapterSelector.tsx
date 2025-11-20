import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, BorderRadius } from '../constants/theme';

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
  const { colors, fontSizes } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      paddingVertical: Spacing.md,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: Spacing.sm,
    },
    chapterButton: {
      width: '14.28%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    chapterButtonInner: {
      width: '90%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: BorderRadius.md,
      backgroundColor: colors.surfaceSecondary,
      borderWidth: 1,
      borderColor: colors.border,
    },
    chapterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    chapterText: {
      fontSize: fontSizes.sm,
      color: colors.text,
      fontWeight: '500',
    },
    chapterTextActive: {
      color: '#ffffff',
      fontWeight: '700',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map((chapter) => (
          <View key={chapter} style={styles.chapterButton}>
            <TouchableOpacity
              style={[
                styles.chapterButtonInner,
                currentChapter === chapter && styles.chapterButtonActive,
              ]}
              onPress={() => onSelectChapter(chapter)}
            >
              <Text
                style={[
                  styles.chapterText,
                  currentChapter === chapter && styles.chapterTextActive,
                ]}
              >
                {chapter}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
