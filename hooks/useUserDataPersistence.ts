import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserBookmark, UserNote } from '../types/bible';

const STORAGE_KEY = '@the_bible_app';

export function useUserDataPersistence(
  bookmarks: UserBookmark[],
  notes: UserNote[],
  setBookmarks: (bookmarks: UserBookmark[]) => void,
  setNotes: (notes: UserNote[]) => void
) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    async function loadData() {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const data = JSON.parse(jsonValue);
          if (data.bookmarks) setBookmarks(data.bookmarks);
          if (data.notes) setNotes(data.notes);
        }
      } catch (e) {
        console.error('Failed to load user data', e);
      } finally {
        setIsLoaded(true);
      }
    }
    loadData();
  }, []); // Empty dependency array ensures this runs only once

  // Save to AsyncStorage whenever data changes
  useEffect(() => {
    if (!isLoaded) return;

    const saveData = async () => {
      try {
        const data = { bookmarks, notes };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save user data', e);
      }
    };
    saveData();
  }, [bookmarks, notes, isLoaded]);

  return { isLoaded };
}
