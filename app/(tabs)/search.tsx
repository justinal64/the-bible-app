import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { Clock, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useBibleSearch, SearchResult } from '../../hooks/useBibleSearch';
import { parseReference } from '../../utils/bibleReferenceParser';
import { ProfileButton } from '../../components/ProfileButton';
import { useSearchHistory } from '../../hooks/useSearchHistory';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { search, results, loading, error } = useBibleSearch();
  const { history, saveSearch } = useSearchHistory();

  const handleSearch = async () => {
    if (query.trim()) {
      await search(query);
      // Save to history after search completes
      saveSearch(query, results.length);
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
            <ProfileButton />
          </View>

          {/* Search Bar */}
          <GlassCard style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRadius: 12, marginBottom: 16 }}>
            <TextInput
              placeholder="Search for verses, books..."
              placeholderTextColor="#A0A0B0"
              className="flex-1 ml-3 text-text-primary text-base"
              style={{ paddingVertical: 0, includeFontPadding: false, textAlignVertical: 'center' }}
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
                {history.length > 0 ? (
                  history.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      className="flex-row items-center py-3 border-b border-gray-800"
                      onPress={() => {
                        setQuery(item.query);
                        search(item.query);
                      }}
                    >
                      <Clock size={16} color="#666" />
                      <Text className="ml-3 flex-1 text-text-primary">{item.query}</Text>
                      <ArrowRight size={16} color="#666" />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text className="text-text-secondary text-center py-4">No recent searches</Text>
                )}
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
