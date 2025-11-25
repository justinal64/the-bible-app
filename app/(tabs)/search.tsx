import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { Search as SearchIcon, Clock, ArrowRight, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { UserAvatar } from '../../components/UserAvatar';

export default function SearchScreen() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-4 py-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-text-primary">Search</Text>
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

          {/* Search Bar */}
          <GlassCard style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 24 }}>
            <SearchIcon size={20} color="#A0A0B0" />
            <TextInput
              placeholder="Search for verses, books..."
              placeholderTextColor="#A0A0B0"
              className="flex-1 ml-3 text-text-primary text-base"
            />
          </GlassCard>

          <ScrollView>
            {/* Recent Searches */}
            <Text className="text-sm font-bold mb-4 uppercase tracking-wider text-text-secondary">Recent Searches</Text>
            <View className="mb-8">
              {['John 3:16', 'Love is patient', 'Psalms 23'].map((item, index) => (
                <TouchableOpacity key={index} className="flex-row items-center py-3 border-b border-gray-800">
                  <Clock size={16} color="#666" />
                  <Text className="ml-3 flex-1 text-text-primary">{item}</Text>
                  <ArrowRight size={16} color="#666" />
                </TouchableOpacity>
              ))}
            </View>

            {/* Categories */}
            <Text className="text-sm font-bold mb-4 uppercase tracking-wider text-text-secondary">Browse by Topic</Text>
            <View className="flex-row flex-wrap gap-3">
              {['Love', 'Hope', 'Faith', 'Peace', 'Healing', 'Wisdom'].map((tag, index) => (
                <TouchableOpacity key={index}>
                  <GlassCard style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}>
                    <Text className="text-text-primary">{tag}</Text>
                  </GlassCard>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </GalaxyBackground>
  );
}
