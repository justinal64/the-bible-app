import { BIBLE_BOOKS } from '../constants/bibleBooks';

export interface ParsedReference {
  bookId: number;
  chapter: number;
  verse?: number;
}

export function parseReference(reference: string): ParsedReference | null {
  // Expected format: "Book Chapter:Verse" or "1 Book Chapter:Verse"
  // Example: "John 3:16", "1 John 1:9", "Genesis 1"

  try {
    // 1. Split into parts to separate book from chapter:verse
    // This is tricky because some books have spaces (1 John)
    // Strategy: Look for the last space, which usually separates book from chapter:verse

    const lastSpaceIndex = reference.lastIndexOf(' ');
    if (lastSpaceIndex === -1) return null;

    const bookNamePart = reference.substring(0, lastSpaceIndex).trim();
    const numbersPart = reference.substring(lastSpaceIndex + 1).trim();

    // 2. Find the book ID
    // We need to match "John" to book ID 43, "1 John" to 62, etc.
    // We'll search our BIBLE_BOOKS constant
    const book = BIBLE_BOOKS.find(b =>
      b.name.toLowerCase() === bookNamePart.toLowerCase() ||
      b.name.toLowerCase().replace(/\s+/g, '') === bookNamePart.toLowerCase().replace(/\s+/g, '')
    );

    if (!book) {
      console.warn(`Could not find book for reference: ${reference}`);
      return null;
    }

    // 3. Parse Chapter and Verse
    let chapter: number;
    let verse: number | undefined;

    if (numbersPart.includes(':')) {
      const [chapterStr, verseStr] = numbersPart.split(':');
      chapter = parseInt(chapterStr, 10);
      verse = parseInt(verseStr, 10);
    } else {
      chapter = parseInt(numbersPart, 10);
    }

    if (isNaN(chapter)) return null;

    return {
      bookId: book.id,
      chapter,
      verse
    };

  } catch (e) {
    console.error('Error parsing reference:', e);
    return null;
  }
}
