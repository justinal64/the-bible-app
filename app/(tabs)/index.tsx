import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useDailyVerse } from '../../hooks/useDailyVerse';
import { useDailyPrayer } from '../../hooks/useDailyPrayer';
import { ProfileButton } from '../../components/ProfileButton';

export default function DashboardScreen() {
  const dailyVerse = useDailyVerse();
  const dailyPrayer = useDailyPrayer();

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView contentContainerClassName="pb-24">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8 px-4">
            <View>
              <Text className="text-sm font-medium mb-1 text-text-secondary">Welcome back</Text>
              <Text className="text-2xl font-bold text-text-primary">Home Dashboard</Text>
            </View>
            <ProfileButton />
          </View>

          {/* Daily Verse */}
          <View className="px-4 mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-text-primary">Daily Verse</Text>
              <Text className="text-xs text-text-secondary">Today</Text>
            </View>
            <GlassCard style={{ height: 200, padding: 0, overflow: 'hidden' }}>
              <Image
                source={{ uri: dailyVerse.image }}
                className="absolute inset-0 w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/40" />
              <View className="flex-1 justify-end p-6">
                <Text className="text-xl font-serif italic mb-2 text-text-primary" style={{ color: '#FFFFFF' }}>
                  "{dailyVerse.text}"
                </Text>
                <Text className="font-bold text-gold">{dailyVerse.reference}</Text>
              </View>
            </GlassCard>
          </View>

          {/* Daily Prayer */}
          <View className="px-4 mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-text-primary">Daily Prayer</Text>
            </View>
            <GlassCard style={{ padding: 20 }}>
              <Text className="text-lg font-serif italic mb-4 text-text-primary leading-7">
                "{dailyPrayer.text}"
              </Text>
              <Text className="font-bold text-gold text-right">- {dailyPrayer.title}</Text>
            </GlassCard>
          </View>

          {/* Reading Plan */}
          {/* <View className="px-4 mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-text-primary">Reading Plan</Text>
              <TouchableOpacity onPress={() => router.push('/plans')}>
                <Text className="text-sm text-gold">View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
              <TouchableOpacity className="mr-4">
                <GlassCard style={{ width: 160, height: 200, padding: 0 }}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1974&auto=format&fit=crop' }}
                    style={{ width: '100%', height: 120 }}
                  />
                  <View className="p-4">
                    <Text className="font-bold mb-1 text-text-primary">New Testament</Text>
                    <Text className="text-xs text-text-secondary">Day 12 of 90</Text>
                    <View className="h-1 bg-gray-700 rounded-full mt-3">
                      <View className="h-1 bg-gold w-[40%] rounded-full" />
                    </View>
                  </View>
                </GlassCard>
              </TouchableOpacity>
              <TouchableOpacity className="mr-4">
                <GlassCard style={{ width: 160, height: 200, padding: 0 }}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop' }}
                    style={{ width: '100%', height: 120 }}
                  />
                  <View className="p-4">
                    <Text className="font-bold mb-1 text-text-primary">Psalms Daily</Text>
                    <Text className="text-xs text-text-secondary">Day 5 of 30</Text>
                    <View className="h-1 bg-gray-700 rounded-full mt-3">
                      <View className="h-1 bg-gold w-[15%] rounded-full" />
                    </View>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            </ScrollView>
          </View> */}

        </ScrollView>
      </SafeAreaView>
    </GalaxyBackground>
  );
}
