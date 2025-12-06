import { useState, useEffect } from 'react';
import { Alert, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';

interface Verse {
  verse: number;
  text: string;
}

interface UseVerseSelectionParams {
  verses: Verse[];
  bookId: number;
  chapter: number;
  currentBookName: string | undefined;
  translationAbbreviation: string;
}

interface UseVerseSelectionReturn {
  selectedVerses: Set<number>;
  handleVersePress: (verseNumber: number) => void;
  handleClearSelection: () => void;
  handleCopy: () => Promise<void>;
  handleShare: () => Promise<void>;
}

/**
 * Hook to manage verse selection, copying, and sharing
 */
export function useVerseSelection({
  verses,
  bookId,
  chapter,
  currentBookName,
  translationAbbreviation,
}: UseVerseSelectionParams): UseVerseSelectionReturn {
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());

  // Clear selection when changing chapter/book
  useEffect(() => {
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
    if (selectedVerses.size === 0 || !currentBookName) return null;

    const sortedVerseNumbers = Array.from(selectedVerses).sort((a, b) => a - b);
    const selectedText = sortedVerseNumbers
      .map(num => {
        const verse = verses.find(v => v.verse === num);
        return verse ? `[${num}] ${verse.text}` : '';
      })
      .join('\n');

    const reference = `${currentBookName} ${chapter}:${sortedVerseNumbers.join(',')}`;
    return `${reference}\n${selectedText}\n(${translationAbbreviation})`;
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

  return {
    selectedVerses,
    handleVersePress,
    handleClearSelection,
    handleCopy,
    handleShare,
  };
}
