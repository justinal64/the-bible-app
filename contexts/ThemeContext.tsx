import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserPreferences } from '../types/bible';
import { Colors, FontSizes, LineSpacing } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: typeof Colors.light;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  fontSizes: typeof FontSizes.medium;
  lineSpacing: 'compact' | 'normal' | 'relaxed';
  lineSpacingValue: number;
  verseNumbersVisible: boolean;
  toggleTheme: () => void;
  setFontSize: (size: UserPreferences['fontSize']) => void;
  setLineSpacing: (spacing: UserPreferences['lineSpacing']) => void;
  toggleVerseNumbers: () => void;
  preferences: Partial<UserPreferences>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = '@bible_app_preferences';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSizeState] = useState<UserPreferences['fontSize']>('medium');
  const [lineSpacing, setLineSpacingState] = useState<UserPreferences['lineSpacing']>('normal');
  const [verseNumbersVisible, setVerseNumbersVisible] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const prefs: Partial<UserPreferences> = JSON.parse(stored);
        if (prefs.theme) setTheme(prefs.theme);
        if (prefs.fontSize) setFontSizeState(prefs.fontSize);
        if (prefs.lineSpacing) setLineSpacingState(prefs.lineSpacing);
        if (prefs.verseNumbersVisible !== undefined) setVerseNumbersVisible(prefs.verseNumbersVisible);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  };

  const savePreferences = async (updates: Partial<UserPreferences>) => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const current = stored ? JSON.parse(stored) : {};
      const updated = { ...current, ...updates };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    savePreferences({ theme: newTheme });
  };

  const setFontSize = (size: UserPreferences['fontSize']) => {
    setFontSizeState(size);
    savePreferences({ fontSize: size });
  };

  const setLineSpacing = (spacing: UserPreferences['lineSpacing']) => {
    setLineSpacingState(spacing);
    savePreferences({ lineSpacing: spacing });
  };

  const toggleVerseNumbers = () => {
    const newValue = !verseNumbersVisible;
    setVerseNumbersVisible(newValue);
    savePreferences({ verseNumbersVisible: newValue });
  };

  const colors = Colors[theme];
  const fontSizes = FontSizes[fontSize];
  const lineSpacingValue = LineSpacing[lineSpacing];

  const value: ThemeContextType = {
    theme,
    colors,
    fontSize,
    fontSizes,
    lineSpacing,
    lineSpacingValue,
    verseNumbersVisible,
    toggleTheme,
    setFontSize,
    setLineSpacing,
    toggleVerseNumbers,
    preferences: {
      theme,
      fontSize,
      lineSpacing,
      verseNumbersVisible,
    },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
