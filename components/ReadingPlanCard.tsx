import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { ReadingPlan } from '../types/bible';
import { BookOpen, Calendar } from 'lucide-react-native';
import { Spacing, BorderRadius } from '../constants/theme';

interface ReadingPlanCardProps {
  plan: ReadingPlan;
  progress?: number;
  onPress: () => void;
}

export function ReadingPlanCard({ plan, progress = 0, onPress }: ReadingPlanCardProps) {
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
      marginBottom: Spacing.sm,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: fontSizes.lg,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    category: {
      fontSize: fontSizes.xs,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      fontWeight: '600',
    },
    description: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      lineHeight: fontSizes.sm * 1.5,
      marginBottom: Spacing.md,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    durationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    durationText: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      marginLeft: Spacing.xs,
    },
    progressContainer: {
      flex: 1,
      marginLeft: Spacing.md,
    },
    progressBar: {
      height: 6,
      backgroundColor: colors.surfaceSecondary,
      borderRadius: BorderRadius.sm,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.success,
      borderRadius: BorderRadius.sm,
    },
    progressText: {
      fontSize: fontSizes.xs,
      color: colors.textTertiary,
      marginTop: Spacing.xs,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <BookOpen size={20} color="#ffffff" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{plan.name}</Text>
          <Text style={styles.category}>{plan.category}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {plan.description}
      </Text>
      <View style={styles.footer}>
        <View style={styles.durationContainer}>
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={styles.durationText}>{plan.durationDays} days</Text>
        </View>
        {progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}% complete</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
