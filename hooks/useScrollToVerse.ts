import { useEffect, RefObject } from 'react';
import { FlatList } from 'react-native';
import { BibleVerse } from '../types/bible';

interface UseScrollToVerseParams {
  flatListRef: RefObject<FlatList | null>;
  verses: BibleVerse[];
  loading: boolean;
  scrollToVerse?: number;
}

export function useScrollToVerse({
  flatListRef,
  verses,
  loading,
  scrollToVerse,
}: UseScrollToVerseParams) {
  useEffect(() => {
    if (!loading && verses.length > 0 && scrollToVerse && flatListRef.current) {
      const index = verses.findIndex(v => v.verse === scrollToVerse);
      if (index !== -1) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.1,
          });
        }, 500);
      }
    }
  }, [loading, verses, scrollToVerse, flatListRef]);
}
