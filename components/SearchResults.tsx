import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { BibleVerse } from '../types/bible';
import { BIBLE_BOOKS } from '../constants/bibleBooks';

interface SearchResult extends BibleVerse {
  bookName: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onResultPress: (bookId: number, chapter: number, verse: number) => void;
}

export function SearchResults({ results, onResultPress }: SearchResultsProps) {
  const { colors, fontSizes } = useTheme();

  if (results.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <Text className="text-base text-text-secondary">No results found</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="flex-1"
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="p-4 bg-galaxy-card rounded-xl mb-2 border border-white/10"
          onPress={() => onResultPress(item.bookId, item.chapter, item.verse)}
        >
          <Text className="text-sm text-gold font-bold mb-1">
            {item.bookName} {item.chapter}:{item.verse}
          </Text>
          <Text className="text-base text-white leading-6">{item.text}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
