import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ReaderState {
  bookId: number;
  chapter: number;
  translationId: string;
}

interface ReaderContextType extends ReaderState {
  setBookId: (id: number) => void;
  setChapter: (chapter: number) => void;
  setTranslationId: (id: string) => void;
  setReaderState: (bookId: number, chapter: number) => void;
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

const STORAGE_KEY = 'reader-storage-context';

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [bookId, setBookIdState] = useState(1);
  const [chapter, setChapterState] = useState(1);
  const [translationId, setTranslationIdState] = useState('de4e12af7f28f599-01');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from storage on mount
  useEffect(() => {
    async function loadState() {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const savedState = JSON.parse(jsonValue);
          if (savedState.state) {
            // Zustand storage format usually wraps in { state: ... }
            // But we will write our own simple format below.
            // Let's handle both just in case, or just simple flat JSON.
            // We will write flat JSON.
             if (savedState.bookId) setBookIdState(savedState.bookId);
             if (savedState.chapter) setChapterState(savedState.chapter);
             if (savedState.translationId) setTranslationIdState(savedState.translationId);
          } else {
             // Fallback for flat structure
             if (savedState.bookId) setBookIdState(savedState.bookId);
             if (savedState.chapter) setChapterState(savedState.chapter);
             if (savedState.translationId) setTranslationIdState(savedState.translationId);
          }
        }
      } catch (e) {
        console.error('Failed to load reader state', e);
      } finally {
        setIsLoaded(true);
      }
    }
    loadState();
  }, []);

  // Save state to storage whenever it changes
  useEffect(() => {
    if (!isLoaded) return; // Don't save initial default if we haven't loaded yet

    const saveState = async () => {
      try {
        const stateToSave = { bookId, chapter, translationId };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (e) {
        console.error('Failed to save reader state', e);
      }
    };
    saveState();
  }, [bookId, chapter, translationId, isLoaded]);

  const setBookId = (id: number) => setBookIdState(id);
  const setChapter = (c: number) => setChapterState(c);
  const setTranslationId = (id: string) => setTranslationIdState(id);

  const setReaderState = (b: number, c: number) => {
    setBookIdState(b);
    setChapterState(c);
  };

  const value = {
    bookId,
    chapter,
    translationId,
    setBookId,
    setChapter,
    setTranslationId,
    setReaderState
  };

  return (
    <ReaderContext.Provider value={value}>
      {children}
    </ReaderContext.Provider>
  );
}

export function useReader() {
  const context = useContext(ReaderContext);
  if (context === undefined) {
    throw new Error('useReader must be used within a ReaderProvider');
  }
  return context;
}
