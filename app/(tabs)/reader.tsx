import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { BibleReader } from '../../components/BibleReader';
import { BookSelector } from '../../components/BookSelector';
import { ChapterSelector } from '../../components/ChapterSelector';
import { TranslationSelector, TRANSLATIONS } from '../../components/TranslationSelector';
import { BIBLE_BOOKS } from '../../constants/bibleBooks';
import { ChevronDown, Volume2, Search, MoreHorizontal } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

export default function ReaderScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [bookId, setBookId] = useState(1);
  const [chapter, setChapter] = useState(1);
  const [translationId, setTranslationId] = useState('de4e12af7f28f599-01'); // KJV
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showChapterSelector, setShowChapterSelector] = useState(false);

  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId);
  const selectedTranslation = TRANSLATIONS.find(t => t.id === translationId) || TRANSLATIONS[0];

  const handleBookSelect = (newBookId: number) => {
    setBookId(newBookId);
    setChapter(1);
    setShowBookSelector(false);
  };

  const handleChapterSelect = (newChapter: number) => {
    setChapter(newChapter);
    setShowChapterSelector(false);
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

  return (
    <GalaxyBackground>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View className="px-4 py-2 flex-row justify-between items-center">
          {/* Segmented Control */}
          <View className="flex-row bg-white/10 rounded-full items-center border border-white/10 overflow-hidden">
            <TouchableOpacity
              className="px-4 py-2 flex-row items-center"
              onPress={() => setShowBookSelector(true)}
            >
              <Text className="text-white font-semibold text-base">
                {currentBook?.name} {chapter}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="w-[1px] h-5 bg-white/20" />

            <TranslationSelector
              selectedTranslationId={translationId}
              onTranslationChange={setTranslationId}
            >
              <View className="px-4 py-2 flex-row items-center">
                <Text className="text-white font-semibold text-base">
                  {selectedTranslation.abbreviation}
                </Text>
              </View>
            </TranslationSelector>
          </View>

          {/* Right Icons */}
          <View className="flex-row gap-5 items-center">
            <TouchableOpacity>
              <Volume2 size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Search size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MoreHorizontal size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <BibleReader
          bookId={bookId}
          chapter={chapter}
          translationId={translationId}
          onVersePress={(verse) => console.log('Verse pressed:', verse)}
          onNextChapter={handleNextChapter}
          onPreviousChapter={handlePreviousChapter}
        />

        <Modal
          visible={showBookSelector}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView className="flex-1 bg-galaxy-bg" edges={['top']}>
            <View className="p-4 flex-row justify-end">
              <Button title="Close" onPress={() => setShowBookSelector(false)} variant="ghost" size="sm" />
            </View>
            <BookSelector
              onSelectBook={handleBookSelect}
              currentBookId={bookId}
            />
          </SafeAreaView>
        </Modal>

        <Modal
          visible={showChapterSelector}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView className="flex-1 bg-galaxy-bg" edges={['top']}>
            <View className="p-4 flex-row justify-end">
              <Button title="Close" onPress={() => setShowChapterSelector(false)} variant="ghost" size="sm" />
            </View>
            <ChapterSelector
              totalChapters={currentBook?.chapterCount || 1}
              currentChapter={chapter}
              onSelectChapter={handleChapterSelect}
            />
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </GalaxyBackground>
  );
}
