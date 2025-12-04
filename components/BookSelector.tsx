import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { BIBLE_BOOKS } from '../constants/bibleBooks';
import { Button } from './ui/Button';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface BookSelectorProps {
  onSelect: (bookId: number, chapter: number) => void;
  currentBookId?: number;
}

export function BookSelector({ onSelect, currentBookId }: BookSelectorProps) {
  const [selectedTestament, setSelectedTestament] = useState<'Old Testament' | 'New Testament'>('Old Testament');
  const [selectedBook, setSelectedBook] = useState<typeof BIBLE_BOOKS[0] | null>(null);
  const { colors, theme } = useTheme();

  const oldTestamentBooks = BIBLE_BOOKS.filter(b => b.testament === 'Old Testament');
  const newTestamentBooks = BIBLE_BOOKS.filter(b => b.testament === 'New Testament');
  const displayedBooks = selectedTestament === 'Old Testament' ? oldTestamentBooks : newTestamentBooks;

  const handleBookPress = (book: typeof BIBLE_BOOKS[0]) => {
    setSelectedBook(book);
  };

  const handleChapterPress = (chapter: number) => {
    if (selectedBook) {
      onSelect(selectedBook.id, chapter);
    }
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  if (selectedBook) {
    return (
      <View className="flex-1 bg-transparent">
        <View className="flex-row items-center p-4 border-b border-white/10" style={{ borderBottomColor: theme === 'light' ? '#E5E5E5' : 'rgba(255, 255, 255, 0.1)' }}>
          <TouchableOpacity onPress={handleBack} className="mr-4">
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text className="text-xl font-bold" style={{ color: colors.text }}>{selectedBook.name}</Text>
        </View>

        <ScrollView contentContainerClassName="p-4 pb-8">
          <View className="flex-row flex-wrap gap-3 justify-center">
            {Array.from({ length: selectedBook.chapterCount }, (_, i) => i + 1).map((chapter) => (
              <TouchableOpacity
                key={chapter}
                onPress={() => handleChapterPress(chapter)}
                className="w-16 h-16 justify-center items-center rounded-xl border"
                style={{
                  backgroundColor: theme === 'light' ? '#F0F0F0' : 'rgba(26, 26, 46, 0.6)',
                  borderColor: theme === 'light' ? '#E5E5E5' : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <Text className="text-lg font-semibold" style={{ color: colors.text }}>{chapter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-transparent">
      <View className="flex-row p-4 gap-4">
        <View className="flex-1">
          <Button
            title="Old Testament"
            onPress={() => setSelectedTestament('Old Testament')}
            variant={selectedTestament === 'Old Testament' ? 'primary' : 'ghost'}
            size="sm"
          />
        </View>
        <View className="flex-1">
          <Button
            title="New Testament"
            onPress={() => setSelectedTestament('New Testament')}
            variant={selectedTestament === 'New Testament' ? 'primary' : 'ghost'}
            size="sm"
          />
        </View>
      </View>

      <ScrollView contentContainerClassName="p-4 pt-0 pb-8">
        {displayedBooks.map((book) => {
          const isActive = currentBookId === book.id;
          return (
            <TouchableOpacity
              key={book.id}
              onPress={() => handleBookPress(book)}
              activeOpacity={0.7}
              className={`mb-3 flex-row justify-between items-center p-4 rounded-xl border`}
              style={{
                backgroundColor: isActive
                  ? (theme === 'light' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.2)')
                  : (theme === 'light' ? '#F0F0F0' : 'rgba(26, 26, 46, 0.6)'),
                borderColor: isActive
                  ? (theme === 'light' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.5)')
                  : (theme === 'light' ? '#E5E5E5' : 'rgba(255, 255, 255, 0.1)')
              }}
            >
              <Text className={`text-base font-bold ${isActive ? 'text-white' : 'text-gray-200'}`}>
                {book.name}
              </Text>
              <Text className={`text-sm font-semibold ${isActive ? 'text-gold' : 'text-gray-400'}`}>
                {book.chapterCount} chapters
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
