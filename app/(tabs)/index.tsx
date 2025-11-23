import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { ChevronRight, BookOpen, Search, Settings, Bookmark } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const QuickAccessItem = ({ icon, label, onPress }: { icon: React.ReactNode, label: string, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} className="items-center justify-center w-[22%]">
      <GlassCard style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginBottom: 8 }}>
        {icon}
      </GlassCard>
      <Text className="text-xs font-medium" style={{ color: '#A0A0B0' }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <GalaxyBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8 px-4">
            <View>
              <Text className="text-sm font-medium mb-1" style={{ color: '#A0A0B0' }}>Welcome back</Text>
              <Text className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>Home Dashboard</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <GlassCard style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                <Settings size={20} color="#D4AF37" />
              </GlassCard>
            </TouchableOpacity>
          </View>

          {/* Daily Verse */}
          <View className="px-4 mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold" style={{ color: '#FFFFFF' }}>Daily Verse</Text>
              <Text className="text-xs" style={{ color: '#A0A0B0' }}>2m ago</Text>
            </View>
            <GlassCard style={{ height: 200, padding: 0, overflow: 'hidden' }}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507692049790-de58293a4697?q=80&w=2070&auto=format&fit=crop' }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
              <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' }} />
              <View className="flex-1 justify-end p-6">
                <Text className="text-xl font-serif italic mb-2" style={{ color: '#FFFFFF' }}>
                  "In the beginning God created the heaven and the earth."
                </Text>
                <Text className="font-bold" style={{ color: '#D4AF37' }}>Genesis 1:1</Text>
              </View>
            </GlassCard>
          </View>

          {/* Quick Access */}
          <View className="px-4 mb-8">
            <Text className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>Quick Access</Text>
            <View className="flex-row justify-between flex-wrap">
              <QuickAccessItem
                icon={<BookOpen size={24} color="#D4AF37" />}
                label="Bible"
                onPress={() => router.push('/reader')}
              />
              <QuickAccessItem
                icon={<Bookmark size={24} color="#D4AF37" />}
                label="Saved"
                onPress={() => router.push('/bookmarks')}
              />
              <QuickAccessItem
                icon={<Search size={24} color="#D4AF37" />}
                label="Search"
                onPress={() => router.push('/search')}
              />
              <QuickAccessItem
                icon={<Settings size={24} color="#D4AF37" />}
                label="Settings"
                onPress={() => router.push('/settings')}
              />
            </View>
          </View>

          {/* Reading Plan */}
          <View className="px-4 mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold" style={{ color: '#FFFFFF' }}>Reading Plan</Text>
              <TouchableOpacity onPress={() => router.push('/plans')}>
                <Text className="text-sm" style={{ color: '#D4AF37' }}>View All</Text>
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
                    <Text className="font-bold mb-1" style={{ color: '#FFFFFF' }}>New Testament</Text>
                    <Text className="text-xs" style={{ color: '#A0A0B0' }}>Day 12 of 90</Text>
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
                    <Text className="font-bold mb-1" style={{ color: '#FFFFFF' }}>Psalms Daily</Text>
                    <Text className="text-xs" style={{ color: '#A0A0B0' }}>Day 5 of 30</Text>
                    <View className="h-1 bg-gray-700 rounded-full mt-3">
                      <View className="h-1 bg-gold w-[15%] rounded-full" />
                    </View>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            </ScrollView>
          </View>

        </ScrollView>
      </SafeAreaView>
    </GalaxyBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});
