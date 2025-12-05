import { useEffect } from 'react';
import { useTextToSpeech } from './useTextToSpeech';
import { BibleVerse } from '../types/bible';

export function useBibleSpeech(verses: BibleVerse[]) {
  const { isSpeaking, speak, stopSpeech } = useTextToSpeech();

  // Automatically stop speech when verses change (chapter/book navigation)
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [verses, stopSpeech]);

  const toggleSpeech = async () => {
    const textToRead = verses.map(v => v.text).join(' ');
    await speak(textToRead);
  };

  return {
    isSpeaking,
    toggleSpeech,
  };
}
