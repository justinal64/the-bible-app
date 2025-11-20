export interface BibleBook {
  id: number;
  name: string;
  testament: 'Old Testament' | 'New Testament';
  chapterCount: number;
  bookOrder: number;
}

export interface BibleTranslation {
  id: string;
  code: string;
  name: string;
  language: string;
  description: string;
  isActive: boolean;
}

export interface BibleVerse {
  id: string;
  translationId: string;
  bookId: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface UserBookmark {
  id: string;
  userId: string;
  bookId: number;
  chapter: number;
  verse: number;
  note?: string;
  createdAt: string;
}

export interface UserHighlight {
  id: string;
  userId: string;
  bookId: number;
  chapter: number;
  verse: number;
  color: string;
  createdAt: string;
}

export interface UserNote {
  id: string;
  userId: string;
  bookId: number;
  chapter: number;
  verse?: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingPlan {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  category: string;
  isActive: boolean;
}

export interface ReadingPlanDay {
  id: string;
  planId: string;
  dayNumber: number;
  bookId: number;
  chapterStart: number;
  chapterEnd: number;
  description?: string;
}

export interface UserReadingProgress {
  id: string;
  userId: string;
  planId: string;
  dayNumber: number;
  completed: boolean;
  completedAt?: string;
  startedAt: string;
}

export interface Devotional {
  id: string;
  title: string;
  content: string;
  scriptureReference: string;
  bookId: number;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  author?: string;
  publishDate: string;
}

export interface UserPreferences {
  userId: string;
  defaultTranslationId: string;
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  lineSpacing: 'compact' | 'normal' | 'relaxed';
  verseNumbersVisible: boolean;
}
