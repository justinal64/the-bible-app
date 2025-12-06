import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

interface UseReaderParamsReturn {
  bookId: number;
  chapter: number;
  translationId: string;
  setBookId: (bookId: number) => void;
  setChapter: (chapter: number) => void;
  setTranslationId: (translationId: string) => void;
}

/**
 * Hook to manage URL parameters and state for the Bible reader
 */
export function useReaderParams(): UseReaderParamsReturn {
  const params = useLocalSearchParams();

  const [bookId, setBookId] = useState(
    params.bookId ? parseInt(params.bookId as string) : 1
  );
  const [chapter, setChapter] = useState(
    params.chapter ? parseInt(params.chapter as string) : 1
  );
  const [translationId, setTranslationId] = useState('de4e12af7f28f599-01');

  // Sync state with URL params when they change
  useEffect(() => {
    if (params.bookId && params.chapter) {
      setBookId(parseInt(params.bookId as string));
      setChapter(parseInt(params.chapter as string));
    }
  }, [params.bookId, params.chapter]);

  return {
    bookId,
    chapter,
    translationId,
    setBookId,
    setChapter,
    setTranslationId,
  };
}
