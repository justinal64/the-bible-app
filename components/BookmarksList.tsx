import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { UserBookmark } from '../types/bible';
import { BIBLE_BOOKS } from '../constants/bibleBooks';
import { Bookmark, Trash2 } from 'lucide-react-native';

interface BookmarksListProps {
  bookmarks: UserBookmark[];
  onBookmarkPress: (bookmark: UserBookmark) => void;
  onDeleteBookmark: (bookmarkId: string) => void;
}

export function BookmarksList({
  bookmarks,
  onBookmarkPress,
  onDeleteBookmark,
}: BookmarksListProps) {
  const { colors, fontSizes } = useTheme();

  const getBookName = (bookId: number) => {
    return BIBLE_BOOKS.find(b => b.id === bookId)?.name || '';
  };

  if (bookmarks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <Bookmark size={48} color="#666677" />
        <Text className="text-base text-text-secondary text-center mt-4">No bookmarks yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="flex-1"
      data={bookmarks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="flex-row items-center p-4 bg-galaxy-card rounded-xl mb-2 border border-white/10">
          <View className="mr-4">
            <Bookmark size={20} color="#D4AF37" fill="#D4AF37" />
          </View>
          <TouchableOpacity
            className="flex-1"
            onPress={() => onBookmarkPress(item)}
          >
            <Text className="text-base text-white font-bold mb-1">
              {getBookName(item.bookId)} {item.chapter}:{item.verse}
            </Text>
            {item.note && <Text className="text-sm text-text-secondary mt-1">{item.note}</Text>}
            <Text className="text-xs text-text-tertiary mt-1">
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 ml-2"
            onPress={() => onDeleteBookmark(item.id)}
          >
            <Trash2 size={18} color="#FF4B4B" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
