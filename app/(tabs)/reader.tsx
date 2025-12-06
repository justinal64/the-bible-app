import React, { useState } from 'react';
import { Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { BibleReader } from '../../components/BibleReader';
import { TextSettingsModal } from '../../components/TextSettingsModal';
import { BIBLE_BOOKS } from '../../constants/bibleBooks';
import { TRANSLATIONS } from '../../components/TranslationSelector';
import { useBibleVerses } from '../../hooks/useBibleVerses';
import { useBibleSpeech } from '../../hooks/useBibleSpeech';
import { useLocalSearchParams } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { useReader } from '../../contexts/ReaderContext';
import { ReaderHeader } from '../../components/ReaderHeader';
import { ReaderSelectionBar } from '../../components/ReaderSelectionBar';
import { BookSelectorModal } from '../../components/BookSelectorModal';

export default function ReaderScreen() {
  const params = useLocalSearchParams();
  const {
    bookId,
    chapter,
    translationId,
    setChapter,
    setReaderState
  } = useReader();

  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showTextSettings, setShowTextSettings] = useState(false);
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());

  const { verses, loading } = useBibleVerses();
  const { isSpeaking, toggleSpeech } = useBibleSpeech(verses);

  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId);
  const selectedTranslation = TRANSLATIONS.find(t => t.id === translationId) || TRANSLATIONS[0];

  React.useEffect(() => {
    if (params.bookId && params.chapter) {
      setReaderState(
        parseInt(params.bookId as string),
        parseInt(params.chapter as string)
      );
    }
  }, [params.bookId, params.chapter, setReaderState]);

  // Clear selection when changing chapter/book
  React.useEffect(() => {
    setSelectedVerses(new Set());
  }, [bookId, chapter]);



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
        <ReaderHeader
          onBookSelectorPress={() => setShowBookSelector(true)}
          onTextSettingsPress={() => setShowTextSettings(true)}
        />

        <BibleReader
          verses={verses}
          loading={loading}
          onVersePress={handleVersePress}
          highlightedVerses={selectedVerses}
          onToggleAudio={toggleSpeech}
          isSpeaking={isSpeaking}
          scrollToVerse={params.verse ? parseInt(params.verse as string) : undefined}
        />

        <ReaderSelectionBar
          selectionCount={selectedVerses.size}
          onClear={handleClearSelection}
          onShare={handleShare}
          onCopy={handleCopy}
        />

        <BookSelectorModal
          visible={showBookSelector}
          onClose={() => setShowBookSelector(false)}
        />

        <TextSettingsModal
          visible={showTextSettings}
          onClose={() => setShowTextSettings(false)}
        />
      </SafeAreaView>
    </GalaxyBackground>
  );
}
