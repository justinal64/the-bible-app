import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { UserNote } from '../types/bible';
import { BIBLE_BOOKS } from '../constants/bibleBooks';
import { FileText, Trash2 } from 'lucide-react-native';

interface NotesListProps {
  notes: UserNote[];
  onNotePress: (note: UserNote) => void;
  onDeleteNote: (noteId: string) => void;
}

export function NotesList({ notes, onNotePress, onDeleteNote }: NotesListProps) {
  const { colors, fontSizes } = useTheme();

  const getBookName = (bookId: number) => {
    return BIBLE_BOOKS.find(b => b.id === bookId)?.name || '';
  };

  if (notes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <FileText size={48} color="#666677" />
        <Text className="text-base text-text-secondary text-center mt-4">No notes yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="flex-1"
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="p-4 bg-galaxy-card rounded-xl mb-2 border border-white/10"
          onPress={() => onNotePress(item)}
        >
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1">
              <Text className="text-base text-white font-bold mb-1">{item.title || 'Untitled'}</Text>
              <Text className="text-sm text-gold font-medium">
                {getBookName(item.bookId)} {item.chapter}
                {item.verse ? `:${item.verse}` : ''}
              </Text>
            </View>
          </View>
          <Text className="text-sm text-text-secondary mb-2 leading-6" numberOfLines={3}>
            {item.content}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-text-tertiary">
              {new Date(item.updatedAt).toLocaleDateString()}
            </Text>
            <TouchableOpacity
              className="p-2"
              onPress={() => onDeleteNote(item.id)}
            >
              <Trash2 size={18} color="#FF4B4B" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
