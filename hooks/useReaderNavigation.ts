import { useReader } from '../contexts/ReaderContext';
import { BIBLE_BOOKS } from '../constants/bibleBooks';

export function useReaderNavigation() {
  const { bookId, chapter, setChapter, setReaderState } = useReader();

  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId);

  const handleNextChapter = () => {
    if (!currentBook) return;

    if (chapter < currentBook.chapterCount) {
      setChapter(chapter + 1);
    } else if (bookId < 66) {
      setReaderState(bookId + 1, 1);
    }
  };

  const handlePreviousChapter = () => {
    if (chapter > 1) {
      setChapter(chapter - 1);
    } else if (bookId > 1) {
      const prevBook = BIBLE_BOOKS.find(b => b.id === bookId - 1);
      if (prevBook) {
        setReaderState(bookId - 1, prevBook.chapterCount);
      }
    }
  };

  return {
    handleNextChapter,
    handlePreviousChapter
  };
}
