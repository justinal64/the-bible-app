import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserBookmark, UserNote } from '../types/bible';
import { useAuth } from './AuthContext';

interface UserDataContextType {
  bookmarks: UserBookmark[];
  notes: UserNote[];
  addBookmark: (bookmark: UserBookmark) => void;
  removeBookmark: (bookmarkId: string) => void;
  addNote: (note: UserNote) => void;
  removeNote: (noteId: string) => void;
  toggleBookmark: (bookId: number, chapter: number, verse: number) => void;
  isBookmarked: (bookId: number, chapter: number, verse: number) => boolean;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);

  // TODO: Load from Supabase or AsyncStorage
  // For now, we start empty, but this state is now global.

  const addBookmark = (bookmark: UserBookmark) => {
    setBookmarks(prev => [...prev, bookmark]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const addNote = (note: UserNote) => {
    setNotes(prev => [...prev, note]);
  };

  const removeNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const toggleBookmark = (bookId: number, chapter: number, verse: number) => {
    const existing = bookmarks.find(
      b => b.bookId === bookId && b.chapter === chapter && b.verse === verse
    );

    if (existing) {
      removeBookmark(existing.id);
    } else {
      const newBookmark: UserBookmark = {
        id: Math.random().toString(36).substr(2, 9), // Temp ID gen
        userId: user?.id || 'guest',
        bookId,
        chapter,
        verse,
        createdAt: new Date().toISOString(),
      };
      addBookmark(newBookmark);
    }
  };

  const isBookmarked = (bookId: number, chapter: number, verse: number) => {
    return bookmarks.some(
      b => b.bookId === bookId && b.chapter === chapter && b.verse === verse
    );
  };

  const value = {
    bookmarks,
    notes,
    addBookmark,
    removeBookmark,
    addNote,
    removeNote,
    toggleBookmark,
    isBookmarked,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}
