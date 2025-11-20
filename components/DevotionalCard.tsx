import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Devotional } from '../types/bible';
import { Heart } from 'lucide-react-native';
import { Spacing, BorderRadius } from '../constants/theme';

interface DevotionalCardProps {
  devotional: Devotional;
  onPress: () => void;
}

export function DevotionalCard({ devotional, onPress }: DevotionalCardProps) {
  const { colors, fontSizes } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.error,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    headerText: {
      flex: 1,
    },
    title: {
      fontSize: fontSizes.lg,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    reference: {
      fontSize: fontSizes.sm,
      color: colors.primary,
      fontWeight: '500',
    },
    content: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      lineHeight: fontSizes.sm * 1.6,
      marginBottom: Spacing.md,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    author: {
      fontSize: fontSizes.xs,
      color: colors.textTertiary,
      fontStyle: 'italic',
    },
    date: {
      fontSize: fontSizes.xs,
      color: colors.textTertiary,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Heart size={20} color="#ffffff" fill="#ffffff" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{devotional.title}</Text>
          <Text style={styles.reference}>{devotional.scriptureReference}</Text>
        </View>
      </View>
      <Text style={styles.content} numberOfLines={4}>
        {devotional.content}
      </Text>
      <View style={styles.footer}>
        {devotional.author && <Text style={styles.author}>by {devotional.author}</Text>}
        <Text style={styles.date}>
          {new Date(devotional.publishDate).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
