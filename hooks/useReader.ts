import { useReaderParams } from './useReaderParams';
import { useChapterNavigation } from './useChapterNavigation';
import { useVerseSelection } from './useVerseSelection';
import { useBibleVerses } from './useBibleVerses';
import { useBibleSpeech } from './useBibleSpeech';
import { TRANSLATIONS } from '../components/TranslationSelector';

/**
 * Unified hook that combines all Bible reader functionality
 * Consolidates state management, navigation, verse selection, and data fetching
 */
export function useReader() {
  // URL params and basic state
  const {
    bookId,
    chapter,
    translationId,
    setBookId,
    setChapter,
    setTranslationId,
  } = useReaderParams();

  // Chapter navigation
  const { handleNextChapter, handlePreviousChapter, currentBook } = useChapterNavigation({
    bookId,
    chapter,
    setBookId,
    setChapter,
  });

  // Data fetching
  const { verses, loading } = useBibleVerses({ bookId, chapter, translationId });
  const { isSpeaking, toggleSpeech } = useBibleSpeech(verses);

  // Derived state
  const selectedTranslation = TRANSLATIONS.find(t => t.id === translationId) || TRANSLATIONS[0];

  // Verse selection and sharing
  const {
    selectedVerses,
    handleVersePress,
    handleClearSelection,
    handleCopy,
    handleShare,
  } = useVerseSelection({
    verses,
    bookId,
    chapter,
    currentBookName: currentBook?.name,
    translationAbbreviation: selectedTranslation.abbreviation,
  });

  return {
    // State
    bookId,
    chapter,
    translationId,
    currentBook,
    selectedTranslation,
    verses,
    loading,
    selectedVerses,
    isSpeaking,

    // State setters
    setBookId,
    setChapter,
    setTranslationId,

    // Navigation handlers
    handleNextChapter,
    handlePreviousChapter,

    // Verse interaction handlers
    handleVersePress,
    handleClearSelection,
    handleCopy,
    handleShare,

    // Audio handler
    toggleSpeech,
  };
}
