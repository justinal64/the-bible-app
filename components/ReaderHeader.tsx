import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';
import { useReader } from '../contexts/ReaderContext';
import { TranslationSelector, TRANSLATIONS } from './TranslationSelector';
import { ProfileButton } from './ProfileButton';
import { ChevronDown, Type, Search } from 'lucide-react-native';
import { BIBLE_BOOKS } from '../constants/bibleBooks';

interface ReaderHeaderProps {
  onBookSelectorPress: () => void;
  onTextSettingsPress: () => void;
}

export function ReaderHeader({ onBookSelectorPress, onTextSettingsPress }: ReaderHeaderProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const { bookId, chapter, translationId } = useReader();

  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId);
  const selectedTranslation = TRANSLATIONS.find(t => t.id === translationId) || TRANSLATIONS[0];

  return (
    <View className="flex-row items-center justify-between px-4 py-2 border-b border-white/10">
      <TouchableOpacity
        onPress={onBookSelectorPress}
        className="flex-row items-center"
      >
        <Text className="text-xl font-bold mr-2" style={{ color: colors.text }}>
          {currentBook ? currentBook.name : 'Select Book'} {chapter}
        </Text>
        <ChevronDown size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View className="flex-row items-center gap-4">
        <TranslationSelector>
          <View className="flex-row items-center">
            <Text className="font-semibold text-base" style={{ color: colors.text }}>
              {selectedTranslation.abbreviation}
            </Text>
          </View>
        </TranslationSelector>

        <TouchableOpacity onPress={onTextSettingsPress}>
          <Type size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/search')}>
          <Search size={24} color={colors.text} />
        </TouchableOpacity>

        <ProfileButton />
      </View>
    </View>
  );
}
