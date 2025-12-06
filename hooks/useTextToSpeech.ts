import { useState, useEffect, useCallback } from 'react';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState<Speech.Voice | null>(null);

  useEffect(() => {
    configureAudio();
    loadBestVoice();
  }, []);

  const configureAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
    } catch (e) {
      console.log('Error configuring audio:', e);
    }
  };

  const loadBestVoice = async () => {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      if (voices.length > 0) {
        const englishVoices = voices.filter(v => v.language.startsWith('en'));

        let bestVoice = englishVoices.find(v =>
          v.quality === 'Enhanced' ||
          v.name.includes('Enhanced') ||
          v.identifier.includes('siri')
        );

        if (!bestVoice) {
          bestVoice = englishVoices[0];
        }

        if (!bestVoice) {
          bestVoice = voices[0];
        }

        setVoice(bestVoice);
      }
    } catch (e) {
      console.log('Error loading voices:', e);
    }
  };

  const stopSpeech = useCallback(async () => {
    const speaking = await Speech.isSpeakingAsync();
    if (speaking) {
      Speech.stop();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    const speaking = await Speech.isSpeakingAsync();

    if (speaking) {
      await stopSpeech();
    } else {
      setIsSpeaking(true);
      Speech.speak(text, {
        voice: voice?.identifier,
        rate: 0.9,
        pitch: 1.0,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  }, [voice, stopSpeech]);

  return {
    isSpeaking,
    speak,
    stopSpeech,
  };
}
