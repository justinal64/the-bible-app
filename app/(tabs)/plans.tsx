import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { ReadingPlanCard } from '../../components/ReadingPlanCard';
import { DevotionalCard } from '../../components/DevotionalCard';
import { ReadingPlan, Devotional } from '../../types/bible';

import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { ProfileButton } from '../../components/ProfileButton';
import { GlassCard } from '../../components/ui/GlassCard';

export default function PlansScreen() {
  const { colors, theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
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

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-4 pt-4 border-b border-white/10" style={{ backgroundColor: theme === 'light' ? '#FFF' : '#1A1A2E' }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold" style={{ color: colors.text }}>Reading Plans</Text>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <ProfileButton />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-2 pb-2">
            <TouchableOpacity
              className={`flex-1 py-2 px-4 rounded-xl items-center`}
              style={{ backgroundColor: activeTab === 'plans' ? '#D4AF37' : (theme === 'light' ? '#F0F0F0' : '#2D2D44') }}
              onPress={() => setActiveTab('plans')}
            >
              <Text
                className={`text-base font-bold`}
                style={{ color: activeTab === 'plans' ? '#FFF' : colors.textSecondary }}
              >
                Plans
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 px-4 rounded-xl items-center`}
              style={{ backgroundColor: activeTab === 'devotionals' ? '#D4AF37' : (theme === 'light' ? '#F0F0F0' : '#2D2D44') }}
              onPress={() => setActiveTab('devotionals')}
            >
              <Text
                className={`text-base font-bold`}
                style={{ color: activeTab === 'devotionals' ? '#FFF' : colors.textSecondary }}
              >
                Devotionals
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
          {activeTab === 'plans' ? (
            <View>
              <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>Available Plans</Text>
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
              <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>Daily Devotionals</Text>
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
    </GalaxyBackground>
  );
}
