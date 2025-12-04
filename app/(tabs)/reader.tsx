import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { BibleReader } from '../../components/BibleReader';
import { BookSelector } from '../../components/BookSelector';
import { TranslationSelector, TRANSLATIONS } from '../../components/TranslationSelector';
import { TextSettingsModal } from '../../components/TextSettingsModal';
import { BIBLE_BOOKS } from '../../constants/bibleBooks';
import { Search, Type, ChevronDown, Copy, X, Share as ShareIcon } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { ProfileButton } from '../../components/ProfileButton';
import { useBibleVerses } from '../../hooks/useBibleVerses';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import * as Clipboard from 'expo-clipboard';
import { GlassCard } from '../../components/ui/GlassCard';

export default function ReaderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [bookId, setBookId] = useState(params.bookId ? parseInt(params.bookId as string) : 1);
  const [chapter, setChapter] = useState(params.chapter ? parseInt(params.chapter as string) : 1);
  const [translationId, setTranslationId] = useState('de4e12af7f28f599-01');
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showTextSettings, setShowTextSettings] = useState(false);
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());

  const { verses, loading } = useBibleVerses({ bookId, chapter, translationId });
  const { isSpeaking, speak, stopSpeech } = useTextToSpeech();
  const { colors, theme } = useTheme();

  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId);
  const selectedTranslation = TRANSLATIONS.find(t => t.id === translationId) || TRANSLATIONS[0];

  React.useEffect(() => {
    if (params.bookId && params.chapter) {
      setBookId(parseInt(params.bookId as string));
      setChapter(parseInt(params.chapter as string));
    }
  }, [params.bookId, params.chapter]);

  React.useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [bookId, chapter, stopSpeech]);

  // Clear selection when changing chapter/book
  React.useEffect(() => {
    setSelectedVerses(new Set());
  }, [bookId, chapter]);

  const handleSelection = (newBookId: number, newChapter: number) => {
    setBookId(newBookId);
    setChapter(newChapter);
    setShowBookSelector(false);
    stopSpeech();
  };

  const toggleSpeech = async () => {
    const textToRead = verses.map(v => v.text).join(' ');
    await speak(textToRead);
  };

  const handleNextChapter = () => {
    if (!currentBook) return;

    if (chapter < currentBook.chapterCount) {
      setChapter(chapter + 1);
    } else if (bookId < 66) {
      setBookId(bookId + 1);
      setChapter(1);
    }
  };

  const handlePreviousChapter = () => {
    if (chapter > 1) {
      setChapter(chapter - 1);
    } else if (bookId > 1) {
      const prevBook = BIBLE_BOOKS.find(b => b.id === bookId - 1);
      if (prevBook) {
        setBookId(bookId - 1);
        setChapter(prevBook.chapterCount);
      }
    }
  };

  const handleVersePress = (verseNumber: number) => {
    setSelectedVerses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(verseNumber)) {
        newSet.delete(verseNumber);
      } else {
        newSet.add(verseNumber);
      }
      return newSet;
    });
  };

  const handleClearSelection = () => {
    setSelectedVerses(new Set());
  };

  const getSelectedContent = () => {
    if (selectedVerses.size === 0 || !currentBook) return null;

    const sortedVerseNumbers = Array.from(selectedVerses).sort((a, b) => a - b);
    const selectedText = sortedVerseNumbers
      .map(num => {
        const verse = verses.find(v => v.verse === num);
        return verse ? `[${num}] ${verse.text}` : '';
      })
      .join('\n');

    const reference = `${currentBook.name} ${chapter}:${sortedVerseNumbers.join(',')}`;
    return `${reference}\n${selectedText}\n(${selectedTranslation.abbreviation})`;
  };

  const handleCopy = async () => {
    const content = getSelectedContent();
    if (!content) return;

    await Clipboard.setStringAsync(content);
    Alert.alert('Copied', 'Verses copied to clipboard');
    handleClearSelection();
  };

  const handleShare = async () => {
    const content = getSelectedContent();
    if (!content) return;

    try {
      await Share.share({
        message: content,
      });
      handleClearSelection();
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-2 border-b border-white/10">
          <TouchableOpacity
            onPress={() => setShowBookSelector(true)}
            className="flex-row items-center"
          >
            <Text className="text-xl font-bold mr-2" style={{ color: colors.text }}>
              {currentBook ? currentBook.name : 'Select Book'} {chapter}
            </Text>
            <ChevronDown size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View className="flex-row items-center gap-4">
            <TranslationSelector
              selectedTranslationId={translationId}
              onTranslationChange={setTranslationId}
            >
              <View className="flex-row items-center">
                <Text className="font-semibold text-base" style={{ color: colors.text }}>
                  {selectedTranslation.abbreviation}
                </Text>
              </View>
            </TranslationSelector>
            <TouchableOpacity onPress={() => setShowTextSettings(true)}>
              <Type size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Search size={24} color={colors.text} />
            </TouchableOpacity>
            <ProfileButton />
          </View>
        </View>

        <BibleReader
          verses={verses}
          loading={loading}
          onVersePress={handleVersePress}
          highlightedVerses={selectedVerses}
          onNextChapter={handleNextChapter}
          onPreviousChapter={handlePreviousChapter}
          onToggleAudio={toggleSpeech}
          isSpeaking={isSpeaking}
          scrollToVerse={params.verse ? parseInt(params.verse as string) : undefined}
        />

        {/* Selection Bar */}
        {selectedVerses.size > 0 && (
          <View className="absolute bottom-8 left-4 right-4 z-50">
            <GlassCard style={{ padding: 12, borderRadius: 16 }}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <TouchableOpacity onPress={handleClearSelection} className="mr-4 p-2">
                    <X size={24} color={colors.text} />
                  </TouchableOpacity>
                  <Text className="font-bold text-lg" style={{ color: colors.text }}>
                    {selectedVerses.size} selected
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={handleShare}
                    className="flex-row items-center bg-gold/20 px-4 py-2 rounded-full"
                    style={{ backgroundColor: theme === 'light' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.2)' }}
                  >
                    <ShareIcon size={20} color="#D4AF37" className="mr-2" />
                    <Text className="font-bold text-gold ml-2">Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCopy}
                    className="flex-row items-center bg-gold/20 px-4 py-2 rounded-full"
                    style={{ backgroundColor: theme === 'light' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.2)' }}
                  >
                    <Copy size={20} color="#D4AF37" className="mr-2" />
                    <Text className="font-bold text-gold ml-2">Copy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </GlassCard>
          </View>
        )}

        <Modal
          visible={showBookSelector}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <GalaxyBackground>
            <SafeAreaView className="flex-1" edges={['top']}>
              <View className="p-4 flex-row justify-end">
                <Button title="Close" onPress={() => setShowBookSelector(false)} variant="ghost" size="sm" />
              </View>
              <BookSelector
                onSelect={handleSelection}
                currentBookId={bookId}
              />
            </SafeAreaView>
          </GalaxyBackground>
        </Modal>

        <TextSettingsModal
          visible={showTextSettings}
          onClose={() => setShowTextSettings(false)}
        />
      </SafeAreaView>
    </GalaxyBackground>
  );
}
