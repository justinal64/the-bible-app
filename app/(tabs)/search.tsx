import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { Search as SearchIcon, Clock, ArrowRight, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { UserAvatar } from '../../components/UserAvatar';
import { useBibleSearch, SearchResult } from '../../hooks/useBibleSearch';
import { parseReference } from '../../utils/bibleReferenceParser';

export default function SearchScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const { search, results, loading, error } = useBibleSearch();

  const handleSearch = () => {
    if (query.trim()) {
      search(query);
    }
  };

  const renderResultItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      className="mb-3"
      onPress={() => {
        const parsed = parseReference(item.reference);
        if (parsed) {
          router.push({
            pathname: '/reader',
            params: {
              bookId: parsed.bookId,
              chapter: parsed.chapter,
              verse: parsed.verse
            }
          });
        } else {
          console.warn('Could not parse reference:', item.reference);
          // Fallback: just go to reader without specific params
          router.push('/reader');
        }
      }}
    >
      <GlassCard style={{ padding: 16, borderRadius: 12 }}>
        <Text className="text-gold font-bold mb-1">{item.reference}</Text>
        <Text className="text-text-primary leading-6" numberOfLines={3}>{item.text}</Text>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-1 px-4 py-4">
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
          <GlassCard style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 16 }}>
            <SearchIcon size={20} color="#A0A0B0" />
            <TextInput
              placeholder="Search for verses, books..."
              placeholderTextColor="#A0A0B0"
              className="flex-1 ml-3 text-text-primary text-base"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {loading && <ActivityIndicator size="small" color="#D4AF37" />}
          </GlassCard>

          {/* Results or Default View */}
          {results.length > 0 ? (
            <FlatList
              data={results}
              renderItem={renderResultItem}
              keyExtractor={(item) => item.verseId}
              contentContainerStyle={{ paddingBottom: 24 }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <ScrollView>
              {/* Recent Searches */}
              <Text className="text-sm font-bold mb-4 uppercase tracking-wider text-text-secondary">Recent Searches</Text>
              <View className="mb-8">
                {['John 3:16', 'Love is patient', 'Psalms 23'].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="flex-row items-center py-3 border-b border-gray-800"
                    onPress={() => {
                      setQuery(item);
                      search(item);
                    }}
                  >
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
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setQuery(tag);
                      search(tag);
                    }}
                  >
                    <GlassCard style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}>
                      <Text className="text-text-primary">{tag}</Text>
                    </GlassCard>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </GalaxyBackground>
  );
}
