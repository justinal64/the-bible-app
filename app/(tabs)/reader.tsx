import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { BibleReader } from '../../components/BibleReader';
import { TextSettingsModal } from '../../components/TextSettingsModal';
import { ReaderHeader } from '../../components/reader/ReaderHeader';
import { SelectionActionBar } from '../../components/reader/SelectionActionBar';
import { BookSelectorModal } from '../../components/reader/BookSelectorModal';
import { useReader } from '../../hooks/useReader';
import { useLocalSearchParams } from 'expo-router';

export default function ReaderScreen() {
  const params = useLocalSearchParams();
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showTextSettings, setShowTextSettings] = useState(false);

  // Unified reader hook
  const {
    bookId,
    chapter,
    translationId,
    currentBook,
    selectedTranslation,
    verses,
    loading,
    selectedVerses,
    isSpeaking,
    setBookId,
    setChapter,
    setTranslationId,
    handleNextChapter,
    handlePreviousChapter,
    handleVersePress,
    handleClearSelection,
    handleCopy,
    handleShare,
    toggleSpeech,
  } = useReader();

  const handleSelection = (newBookId: number, newChapter: number) => {
    setBookId(newBookId);
    setChapter(newChapter);
    setShowBookSelector(false);
  };

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <ReaderHeader
          currentBookName={currentBook?.name}
          chapter={chapter}
          translationId={translationId}
          onBookSelectorPress={() => setShowBookSelector(true)}
          onTextSettingsPress={() => setShowTextSettings(true)}
          onTranslationChange={setTranslationId}
        />

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

        <SelectionActionBar
          selectionCount={selectedVerses.size}
          onClearSelection={handleClearSelection}
          onCopy={handleCopy}
          onShare={handleShare}
        />

        <BookSelectorModal
          visible={showBookSelector}
          currentBookId={bookId}
          onSelect={handleSelection}
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
