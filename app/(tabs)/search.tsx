import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { Clock, ArrowRight, Search as SearchIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useBibleSearch, SearchResult } from '../../hooks/useBibleSearch';
import { parseReference } from '../../utils/bibleReferenceParser';
import { ProfileButton } from '../../components/ProfileButton';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import { useTheme } from '../../contexts/ThemeContext';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { search, results, loading, error } = useBibleSearch();
  const { history, saveSearch } = useSearchHistory();
  const { colors, theme } = useTheme();

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
        <Text className="leading-6" numberOfLines={3} style={{ color: colors.text }}>{item.text}</Text>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-1 px-4 py-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold" style={{ color: colors.text }}>Search</Text>
            <ProfileButton />
          </View>

          {/* Search Bar */}
          <GlassCard style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRadius: 12, marginBottom: 16 }}>
            <SearchIcon size={20} color={colors.textSecondary} style={{ marginTop: -2 }} />
            <TextInput
              placeholder="Search for verses, books..."
              placeholderTextColor={colors.textSecondary}
              className="flex-1 ml-3 text-base"
              style={{ paddingVertical: 0, includeFontPadding: false, textAlignVertical: 'center', color: colors.text }}
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
              <Text className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: colors.textSecondary }}>Recent Searches</Text>
              <View className="mb-8">
                {history.length > 0 ? (
                  history.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      className="flex-row items-center py-3 border-b border-gray-800"
                      style={{ borderColor: theme === 'light' ? '#E5E5E5' : '#1F2937' }}
                      onPress={() => {
                        setQuery(item.query);
                        search(item.query);
                      }}
                    >
                      <Clock size={16} color={colors.textSecondary} />
                      <Text className="ml-3 flex-1" style={{ color: colors.text }}>{item.query}</Text>
                      <ArrowRight size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text className="text-center py-4" style={{ color: colors.textSecondary }}>No recent searches</Text>
                )}
              </View>

              {/* Categories */}
              <Text className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: colors.textSecondary }}>Browse by Topic</Text>
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
                      <Text style={{ color: colors.text }}>{tag}</Text>
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
