import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { BibleReader } from '../../components/BibleReader';
import { BookSelector } from '../../components/BookSelector';
import { TranslationSelector, TRANSLATIONS } from '../../components/TranslationSelector';
import { BIBLE_BOOKS } from '../../constants/bibleBooks';
import { Volume2, Search, Type, Settings } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { UserAvatar } from '../../components/UserAvatar';

import * as Speech from 'expo-speech';
import { useBibleVerses } from '../../hooks/useBibleVerses';

export default function ReaderScreen() {
  const router = useRouter();
  const { colors, fontSize, setFontSize } = useTheme();
  const { user } = useAuth();
  const [bookId, setBookId] = useState(1);
  const [chapter, setChapter] = useState(1);
  const [translationId, setTranslationId] = useState('de4e12af7f28f599-01'); // KJV
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showTextSettings, setShowTextSettings] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState<Speech.Voice | null>(null);

  const { verses, loading } = useBibleVerses({ bookId, chapter, translationId });

  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId);
  const selectedTranslation = TRANSLATIONS.find(t => t.id === translationId) || TRANSLATIONS[0];

  React.useEffect(() => {
    loadBestVoice();
  }, []);

  const loadBestVoice = async () => {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      if (voices.length > 0) {
        // Prioritize English voices
        const englishVoices = voices.filter(v => v.language.startsWith('en'));

        // Try to find an enhanced/premium voice
        // iOS often has 'Enhanced' in the name or specific high quality identifiers
        let bestVoice = englishVoices.find(v =>
          v.quality === 'Enhanced' ||
          v.name.includes('Enhanced') ||
          v.identifier.includes('siri')
        );

        // Fallback to any English voice
        if (!bestVoice) {
          bestVoice = englishVoices[0];
        }

        // Fallback to any voice
        if (!bestVoice) {
          bestVoice = voices[0];
        }

        setVoice(bestVoice);
        console.log('Selected voice:', bestVoice.name, bestVoice.identifier);
      }
    } catch (e) {
      console.log('Error loading voices:', e);
    }
  };

  const handleSelection = (newBookId: number, newChapter: number) => {
    setBookId(newBookId);
    setChapter(newChapter);
    setShowBookSelector(false);
    stopSpeech();
  };

  const stopSpeech = async () => {
    const speaking = await Speech.isSpeakingAsync();
    if (speaking) {
      Speech.stop();
      setIsSpeaking(false);
    }
  };

  const toggleSpeech = async () => {
    const speaking = await Speech.isSpeakingAsync();

    if (speaking) {
      await stopSpeech();
    } else {
      setIsSpeaking(true);
      const textToRead = verses.map(v => v.text).join(' ');
      Speech.speak(textToRead, {
        voice: voice?.identifier,
        rate: 0.9, // Slightly slower for better comprehension
        pitch: 1.0,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  // Stop speech when leaving the screen or changing chapters
  React.useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [bookId, chapter]);

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

  return (
    <GalaxyBackground>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View className="px-4 py-2 flex-row justify-between items-center">
          {/* Segmented Control */}
          <View className="flex-row bg-white/10 rounded-full items-center border border-white/10 overflow-hidden">
            <TouchableOpacity
              className="px-4 py-2 flex-row items-center"
              onPress={() => setShowBookSelector(true)}
            >
              <Text className="text-white font-semibold text-base">
                {currentBook?.name} {chapter}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="w-[1px] h-5 bg-white/20" />

            <TranslationSelector
              selectedTranslationId={translationId}
              onTranslationChange={setTranslationId}
            >
              <View className="px-4 py-2 flex-row items-center">
                <Text className="text-white font-semibold text-base">
                  {selectedTranslation.abbreviation}
                </Text>
              </View>
            </TranslationSelector>
          </View>

          {/* Right Icons */}
          <View className="flex-row gap-5 items-center">
            <TouchableOpacity onPress={toggleSpeech}>
              {isSpeaking ? (
                <Volume2 size={24} color="#D4AF37" fill="#D4AF37" />
              ) : (
                <Volume2 size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTextSettings(true)}>
              <Type size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Search size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              {user ? (
                <UserAvatar />
              ) : (
                <Settings size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>

          </View>
        </View>

        <BibleReader
          verses={verses}
          loading={loading}
          onVersePress={(verse) => console.log('Verse pressed:', verse)}
          onNextChapter={handleNextChapter}
          onPreviousChapter={handlePreviousChapter}
        />

        <Modal
          visible={showBookSelector}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView className="flex-1 bg-galaxy-bg" edges={['top']}>
            <View className="p-4 flex-row justify-end">
              <Button title="Close" onPress={() => setShowBookSelector(false)} variant="ghost" size="sm" />
            </View>
            <BookSelector
              onSelect={handleSelection}
              currentBookId={bookId}
            />
          </SafeAreaView>
        </Modal>

        {/* Text Settings Modal */}
        <Modal
          visible={showTextSettings}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowTextSettings(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center items-center"
            activeOpacity={1}
            onPress={() => setShowTextSettings(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              className="bg-galaxy-card w-[80%] rounded-2xl p-6 border border-white/10"
            >
              <Text className="text-white font-bold text-lg mb-4 text-center">Text Settings</Text>

              <View className="flex-row justify-between items-center bg-white/5 rounded-xl p-2 mb-4">
                {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setFontSize(size)}
                    className={`p-3 rounded-lg ${fontSize === size ? 'bg-gold' : 'bg-transparent'}`}
                  >
                    <Text className={`font-bold ${fontSize === size ? 'text-galaxy-bg' : 'text-white'}`} style={{ fontSize: size === 'small' ? 14 : size === 'medium' ? 18 : size === 'large' ? 22 : 26 }}>
                      Aa
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Button title="Done" onPress={() => setShowTextSettings(false)} variant="primary" />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </GalaxyBackground>
  );
}
