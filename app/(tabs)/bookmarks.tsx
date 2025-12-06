import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useUserData } from '../../contexts/UserDataContext';
import { BookmarksList } from '../../components/BookmarksList';
import { NotesList } from '../../components/NotesList';
import { UserBookmark, UserNote } from '../../types/bible';

import { useRouter } from 'expo-router';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { ProfileButton } from '../../components/ProfileButton';
import { GlassCard } from '../../components/ui/GlassCard';

export default function BookmarksScreen() {
  const { colors, theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const { bookmarks, notes, removeBookmark, removeNote } = useUserData();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes'>('bookmarks');

  const handleBookmarkPress = (bookmark: UserBookmark) => {
    // Navigate to the bookmarked verse
    router.push({
      pathname: '/reader',
      params: {
        bookId: bookmark.bookId.toString(),
        chapter: bookmark.chapter.toString(),
        verse: bookmark.verse.toString()
      }
    });
  };

  const handleNotePress = (note: UserNote) => {
    // Navigate to valid note location
    router.push({
      pathname: '/reader',
      params: {
        bookId: note.bookId.toString(),
        chapter: note.chapter.toString(),
        verse: note.verse?.toString()
      }
    });
  };

  const handleDeleteBookmark = (bookmarkId: string) => {
    removeBookmark(bookmarkId);
  };

  const handleDeleteNote = (noteId: string) => {
    removeNote(noteId);
  };

  if (!user) {
    return (
      <GalaxyBackground>
        <SafeAreaView className="flex-1" edges={['top']}>
          <View className="px-4 pt-4 border-b border-white/10" style={{ backgroundColor: theme === 'light' ? '#FFF' : '#1A1A2E' }}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold" style={{ color: colors.text }}>Bookmarks & Notes</Text>
              <TouchableOpacity onPress={() => router.push('/settings')}>
                <ProfileButton />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-1 justify-center items-center p-8">
            <Text className="text-base text-center mb-4" style={{ color: colors.textSecondary }}>
              Sign in to save bookmarks and create notes
            </Text>
            <TouchableOpacity
              className="py-3 px-8 bg-gold rounded-xl"
              onPress={() => router.push('/settings')}
            >
              <Text className="text-base text-white font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </GalaxyBackground>
    );
  }

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-4 pt-4 border-b border-white/10" style={{ backgroundColor: theme === 'light' ? '#FFF' : '#1A1A2E' }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold" style={{ color: colors.text }}>Bookmarks & Notes</Text>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <ProfileButton />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-2 pb-2">
            <TouchableOpacity
              className={`flex-1 py-2 px-4 rounded-xl items-center`}
              style={{ backgroundColor: activeTab === 'bookmarks' ? '#D4AF37' : (theme === 'light' ? '#F0F0F0' : '#2D2D44') }}
              onPress={() => setActiveTab('bookmarks')}
            >
              <Text
                className={`text-base font-bold`}
                style={{ color: activeTab === 'bookmarks' ? '#FFF' : colors.textSecondary }}
              >
                Bookmarks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 px-4 rounded-xl items-center`}
              style={{ backgroundColor: activeTab === 'notes' ? '#D4AF37' : (theme === 'light' ? '#F0F0F0' : '#2D2D44') }}
              onPress={() => setActiveTab('notes')}
            >
              <Text
                className={`text-base font-bold`}
                style={{ color: activeTab === 'notes' ? '#FFF' : colors.textSecondary }}
              >
                Notes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 p-4">
          {activeTab === 'bookmarks' ? (
            <BookmarksList
              bookmarks={bookmarks}
              onBookmarkPress={handleBookmarkPress}
              onDeleteBookmark={handleDeleteBookmark}
            />
          ) : (
            <NotesList
              notes={notes}
              onNotePress={handleNotePress}
              onDeleteNote={handleDeleteNote}
            />
          )}
        </View>
      </SafeAreaView>
    </GalaxyBackground>
  );
}
