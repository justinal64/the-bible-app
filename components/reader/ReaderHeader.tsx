import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ChevronDown, Type, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { TranslationSelector, TRANSLATIONS } from '../TranslationSelector';
import { ProfileButton } from '../ProfileButton';

interface ReaderHeaderProps {
  currentBookName: string | undefined;
  chapter: number;
  translationId: string;
  onBookSelectorPress: () => void;
  onTextSettingsPress: () => void;
  onTranslationChange: (translationId: string) => void;
}

export function ReaderHeader({
  currentBookName,
  chapter,
  translationId,
  onBookSelectorPress,
  onTextSettingsPress,
  onTranslationChange,
}: ReaderHeaderProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const selectedTranslation = TRANSLATIONS.find(t => t.id === translationId) || TRANSLATIONS[0];

  return (
    <View className="flex-row items-center justify-between px-4 py-2 border-b border-white/10">
      <TouchableOpacity
        onPress={onBookSelectorPress}
        className="flex-row items-center"
      >
        <Text className="text-xl font-bold mr-2" style={{ color: colors.text }}>
          {currentBookName || 'Select Book'} {chapter}
        </Text>
        <ChevronDown size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View className="flex-row items-center gap-4">
        <TranslationSelector
          selectedTranslationId={translationId}
          onTranslationChange={onTranslationChange}
        >
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
