import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { ReadingPlanCard } from '../../components/ReadingPlanCard';
import { DevotionalCard } from '../../components/DevotionalCard';
import { ReadingPlan, Devotional } from '../../types/bible';
import { Spacing, BorderRadius } from '../../constants/theme';

export default function PlansScreen() {
  const { colors, fontSizes } = useTheme();
  const [activeTab, setActiveTab] = useState<'plans' | 'devotionals'>('plans');

  const mockPlans: ReadingPlan[] = [
    {
      id: '1',
      name: 'Bible in One Year',
      description: 'Read through the entire Bible in 365 days with daily readings from Old Testament, New Testament, Psalms, and Proverbs.',
      durationDays: 365,
      category: 'Complete Bible',
      isActive: true,
    },
    {
      id: '2',
      name: 'New Testament in 90 Days',
      description: 'Experience the life of Jesus and the early church by reading through the entire New Testament in just three months.',
      durationDays: 90,
      category: 'New Testament',
      isActive: true,
    },
  ];

  const mockDevotionals: Devotional[] = [
    {
      id: '1',
      title: "God's Unfailing Love",
      content: 'In a world of uncertainty, we can find comfort in knowing that God\'s love never fails. His love is not based on our performance or worthiness, but on His unchanging character...',
      scriptureReference: 'Psalm 136:1-3',
      bookId: 19,
      chapter: 136,
      verseStart: 1,
      verseEnd: 3,
      author: 'Daily Devotions',
      publishDate: new Date().toISOString(),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: fontSizes['2xl'],
      color: colors.text,
      fontWeight: '700',
      marginBottom: Spacing.md,
    },
    tabContainer: {
      flexDirection: 'row',
      gap: Spacing.sm,
      paddingBottom: Spacing.sm,
    },
    tab: {
      flex: 1,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      backgroundColor: colors.surfaceSecondary,
    },
    tabActive: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: fontSizes.base,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    tabTextActive: {
      color: '#ffffff',
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: Spacing.md,
    },
    sectionTitle: {
      fontSize: fontSizes.lg,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.md,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Reading Plans</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'plans' && styles.tabActive]}
            onPress={() => setActiveTab('plans')}
          >
            <Text
              style={[styles.tabText, activeTab === 'plans' && styles.tabTextActive]}
            >
              Plans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'devotionals' && styles.tabActive]}
            onPress={() => setActiveTab('devotionals')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'devotionals' && styles.tabTextActive,
              ]}
            >
              Devotionals
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'plans' ? (
          <View>
            <Text style={styles.sectionTitle}>Available Plans</Text>
            {mockPlans.map((plan) => (
              <ReadingPlanCard
                key={plan.id}
                plan={plan}
                progress={0}
                onPress={() => console.log('Open plan:', plan.id)}
              />
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Daily Devotionals</Text>
            {mockDevotionals.map((devotional) => (
              <DevotionalCard
                key={devotional.id}
                devotional={devotional}
                onPress={() => console.log('Open devotional:', devotional.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
