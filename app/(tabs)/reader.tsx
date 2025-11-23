import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { BibleReader } from '../../components/BibleReader';
import { BookSelector } from '../../components/BookSelector';
import { ChapterSelector } from '../../components/ChapterSelector';
import { TranslationSelector } from '../../components/TranslationSelector';
import { BIBLE_BOOKS } from '../../constants/bibleBooks';
import { ChevronDown } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

export default function ReaderScreen() {
  const { colors } = useTheme();
  const [bookId, setBookId] = useState(1);
  const [chapter, setChapter] = useState(1);
  const [translationId, setTranslationId] = useState('de4e12af7f28f599-01'); // KJV
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showChapterSelector, setShowChapterSelector] = useState(false);

  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId);

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
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-4 py-2">
          <View className="flex-row gap-2">
            <View className="flex-1">
              <TranslationSelector
                selectedTranslationId={translationId}
                onTranslationChange={setTranslationId}
              />
            </View>
            <View className="flex-1">
              <Button
                title={currentBook?.name || 'Select Book'}
                onPress={() => setShowBookSelector(true)}
                variant="secondary"
                icon={<ChevronDown size={18} color="#FFFFFF" />}
              />
            </View>
            <View className="flex-1">
              <Button
                title={`Chapter ${chapter}`}
                onPress={() => setShowChapterSelector(true)}
                variant="secondary"
                icon={<ChevronDown size={18} color="#FFFFFF" />}
              />
            </View>
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
