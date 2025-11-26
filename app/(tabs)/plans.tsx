import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { ReadingPlanCard } from '../../components/ReadingPlanCard';
import { DevotionalCard } from '../../components/DevotionalCard';
import { ReadingPlan, Devotional } from '../../types/bible';
import { Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { UserAvatar } from '../../components/UserAvatar';
import { GlassCard } from '../../components/ui/GlassCard';

export default function PlansScreen() {
  const { colors, fontSizes } = useTheme();
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
    <SafeAreaView className="flex-1 bg-galaxy-bg" edges={['top']}>
      <View className="bg-galaxy-card px-4 pt-4 border-b border-white/10">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-white">Reading Plans</Text>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            {user ? (
              <UserAvatar />
            ) : (
              <GlassCard style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                <Settings size={20} color="#D4AF37" />
              </GlassCard>
            )}
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-2 pb-2">
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-xl items-center ${activeTab === 'plans' ? 'bg-gold' : 'bg-galaxy-accent'}`}
            onPress={() => setActiveTab('plans')}
          >
            <Text
              className={`text-base font-bold ${activeTab === 'plans' ? 'text-white' : 'text-text-secondary'}`}
            >
              Plans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-xl items-center ${activeTab === 'devotionals' ? 'bg-gold' : 'bg-galaxy-accent'}`}
            onPress={() => setActiveTab('devotionals')}
          >
            <Text
              className={`text-base font-bold ${activeTab === 'devotionals' ? 'text-white' : 'text-text-secondary'}`}
            >
              Devotionals
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {activeTab === 'plans' ? (
          <View>
            <Text className="text-lg text-white font-bold mb-4">Available Plans</Text>
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
            <Text className="text-lg text-white font-bold mb-4">Daily Devotionals</Text>
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
