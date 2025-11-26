import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { BookmarksList } from '../../components/BookmarksList';
import { NotesList } from '../../components/NotesList';
import { UserBookmark, UserNote } from '../../types/bible';
import { Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { UserAvatar } from '../../components/UserAvatar';
import { GlassCard } from '../../components/ui/GlassCard';

export default function BookmarksScreen() {
  const { colors, fontSizes } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [bookmarks] = useState<UserBookmark[]>([]);
  const [notes] = useState<UserNote[]>([]);

  const handleBookmarkPress = (bookmark: UserBookmark) => {
    console.log('Navigate to bookmark:', bookmark);
  };

  const handleNotePress = (note: UserNote) => {
    console.log('Open note:', note);
  };

  const handleDeleteBookmark = (bookmarkId: string) => {
    console.log('Delete bookmark:', bookmarkId);
  };

  const handleDeleteNote = (noteId: string) => {
    console.log('Delete note:', noteId);
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-galaxy-bg" edges={['top']}>
        <View className="bg-galaxy-card px-4 pt-4 border-b border-white/10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-white">Bookmarks & Notes</Text>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <GlassCard style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                <Settings size={20} color="#D4AF37" />
              </GlassCard>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 justify-center items-center p-8">
          <Text className="text-base text-text-secondary text-center mb-4">
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
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-galaxy-bg" edges={['top']}>
      <View className="bg-galaxy-card px-4 pt-4 border-b border-white/10">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-white">Bookmarks & Notes</Text>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <UserAvatar />
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-2 pb-2">
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-xl items-center ${activeTab === 'bookmarks' ? 'bg-gold' : 'bg-galaxy-accent'}`}
            onPress={() => setActiveTab('bookmarks')}
          >
            <Text
              className={`text-base font-bold ${activeTab === 'bookmarks' ? 'text-white' : 'text-text-secondary'}`}
            >
              Bookmarks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-xl items-center ${activeTab === 'notes' ? 'bg-gold' : 'bg-galaxy-accent'}`}
            onPress={() => setActiveTab('notes')}
          >
            <Text
              className={`text-base font-bold ${activeTab === 'notes' ? 'text-white' : 'text-text-secondary'}`}
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
  );
}
