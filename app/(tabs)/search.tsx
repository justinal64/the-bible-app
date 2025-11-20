import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { SearchBar } from '../../components/SearchBar';
import { SearchResults } from '../../components/SearchResults';
import { Spacing } from '../../constants/theme';

export default function SearchScreen() {
  const { colors, fontSizes } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const mockResults = Array.from({ length: 5 }, (_, i) => ({
      id: `result-${i}`,
      translationId: 'niv',
      bookId: 43,
      bookName: 'John',
      chapter: 3,
      verse: 16 + i,
      text: `For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. ${query}`,
    }));
    setSearchResults(mockResults);
  };

  const handleResultPress = (bookId: number, chapter: number, verse: number) => {
    console.log('Navigate to:', bookId, chapter, verse);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: fontSizes['2xl'],
      color: colors.text,
      fontWeight: '700',
      marginBottom: Spacing.md,
    },
    content: {
      flex: 1,
      padding: Spacing.md,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: fontSizes.base,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <SearchBar onSearch={handleSearch} />
      </View>
      <View style={styles.content}>
        {searchQuery.trim().length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Search for verses, topics, or keywords
            </Text>
          </View>
        ) : (
          <SearchResults results={searchResults} onResultPress={handleResultPress} />
        )}
      </View>
    </SafeAreaView>
  );
}
