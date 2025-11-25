import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { BookmarksList } from '../../components/BookmarksList';
import { NotesList } from '../../components/NotesList';
import { UserBookmark, UserNote } from '../../types/bible';
import { Spacing, BorderRadius } from '../../constants/theme';
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    title: {
      fontSize: fontSizes['2xl'],
      color: colors.text,
      fontWeight: '700',
    },
    tabContainer: {
      flexDirection: 'row',
      gap: Spacing.sm,
      paddingBottom: Spacing.sm,
    },
    tab: {
      flex: 1,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      backgroundColor: colors.surfaceSecondary,
    },
    tabActive: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: fontSizes.base,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    tabTextActive: {
      color: '#ffffff',
    },
    content: {
      flex: 1,
      padding: Spacing.md,
    },
    authPrompt: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.xl,
    },
    authPromptText: {
      fontSize: fontSizes.base,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: Spacing.md,
    },
    signInButton: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.xl,
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.md,
    },
    signInButtonText: {
      fontSize: fontSizes.base,
      color: '#ffffff',
      fontWeight: '600',
    },
  });

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Bookmarks & Notes</Text>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <GlassCard style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                <Settings size={20} color="#D4AF37" />
              </GlassCard>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.authPrompt}>
          <Text style={styles.authPromptText}>
            Sign in to save bookmarks and create notes
          </Text>
          <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/settings')}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Bookmarks & Notes</Text>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <UserAvatar />
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bookmarks' && styles.tabActive]}
            onPress={() => setActiveTab('bookmarks')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'bookmarks' && styles.tabTextActive,
              ]}
            >
              Bookmarks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'notes' && styles.tabActive]}
            onPress={() => setActiveTab('notes')}
          >
            <Text
              style={[styles.tabText, activeTab === 'notes' && styles.tabTextActive]}
            >
              Notes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
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
