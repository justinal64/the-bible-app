import { BIBLE_BOOKS } from '../constants/bibleBooks';

interface UseChapterNavigationParams {
  bookId: number;
  chapter: number;
  setBookId: (bookId: number) => void;
  setChapter: (chapter: number) => void;
}

interface UseChapterNavigationReturn {
  handleNextChapter: () => void;
  handlePreviousChapter: () => void;
  currentBook: typeof BIBLE_BOOKS[0] | undefined;
}

/**
 * Hook to manage chapter navigation (next/previous)
 */
export function useChapterNavigation({
  bookId,
  chapter,
  setBookId,
  setChapter,
}: UseChapterNavigationParams): UseChapterNavigationReturn {
  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId);

  const handleNextChapter = () => {
    if (!currentBook) return;

    if (chapter < currentBook.chapterCount) {
      setChapter(chapter + 1);
    } else if (bookId < 66) {
      setBookId(bookId + 1);
      setChapter(1);
    }
  };

  const handlePreviousChapter = () => {
    if (chapter > 1) {
      setChapter(chapter - 1);
    } else if (bookId > 1) {
      const prevBook = BIBLE_BOOKS.find(b => b.id === bookId - 1);
      if (prevBook) {
        setBookId(bookId - 1);
        setChapter(prevBook.chapterCount);
      }
    }
  };

  return {
    handleNextChapter,
    handlePreviousChapter,
    currentBook,
  };
}
