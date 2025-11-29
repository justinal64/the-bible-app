import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { BibleReader } from '../../components/BibleReader';
import { BookSelector } from '../../components/BookSelector';
import { TranslationSelector, TRANSLATIONS } from '../../components/TranslationSelector';
import { TextSettingsModal } from '../../components/TextSettingsModal';
import { BIBLE_BOOKS } from '../../constants/bibleBooks';
import { Search, Type } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { ProfileButton } from '../../components/ProfileButton';
import { useBibleVerses } from '../../hooks/useBibleVerses';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ReaderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [bookId, setBookId] = useState(params.bookId ? parseInt(params.bookId as string) : 1);
  const [chapter, setChapter] = useState(params.chapter ? parseInt(params.chapter as string) : 1);
  const [translationId, setTranslationId] = useState('de4e12af7f28f599-01');
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showTextSettings, setShowTextSettings] = useState(false);

  const { verses, loading } = useBibleVerses({ bookId, chapter, translationId });
  const { isSpeaking, speak, stopSpeech } = useTextToSpeech();

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
            <TouchableOpacity onPress={() => setShowTextSettings(true)}>
              <Type size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Search size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <ProfileButton />

          </View>
        </View>

        <BibleReader
          verses={verses}
          loading={loading}
          onVersePress={(verse) => console.log('Verse pressed:', verse)}
          onNextChapter={handleNextChapter}
          onPreviousChapter={handlePreviousChapter}
          onToggleAudio={toggleSpeech}
          isSpeaking={isSpeaking}
          scrollToVerse={params.verse ? parseInt(params.verse as string) : undefined}
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
              onSelect={handleSelection}
              currentBookId={bookId}
            />
          </SafeAreaView>
        </Modal>

        <TextSettingsModal
          visible={showTextSettings}
          onClose={() => setShowTextSettings(false)}
        />
      </SafeAreaView>
    </GalaxyBackground>
  );
}
