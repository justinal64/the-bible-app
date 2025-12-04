import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown, Check } from 'lucide-react-native';

interface Translation {
  id: string;
  name: string;
  abbreviation: string;
  language?: string;
}

export const TRANSLATIONS: Translation[] = [
  { id: 'de4e12af7f28f599-01', name: 'King James Version', abbreviation: 'KJV', language: 'English' },
  { id: '06125adad2d5898a-01', name: 'American Standard Version', abbreviation: 'ASV', language: 'English' },
  { id: '9879dbb7cfe39e4d-01', name: 'World English Bible', abbreviation: 'WEB', language: 'English' },
];

interface TranslationSelectorProps {
  selectedTranslationId: string;
  onTranslationChange: (translationId: string) => void;
}

export function TranslationSelector({ selectedTranslationId, onTranslationChange, children }: TranslationSelectorProps & { children?: React.ReactNode }) {
  const { colors, theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const selectedTranslation = TRANSLATIONS.find(t => t.id === selectedTranslationId) || TRANSLATIONS[0];

  const handleSelect = (translationId: string) => {
    onTranslationChange(translationId);
    setModalVisible(false);
  };

  return (
    <View>
      {children ? (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {children}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          className="bg-galaxy-accent rounded-xl border-2 border-galaxy-accent border-b-4 border-b-galaxy-card flex-row items-center justify-center px-6 py-2"
          style={{
            transform: [{ translateY: isPressed ? 2 : 0 }],
            backgroundColor: theme === 'light' ? '#F0F0F0' : 'rgba(26, 26, 46, 0.6)',
            borderColor: theme === 'light' ? '#E5E5E5' : 'rgba(255, 255, 255, 0.1)',
            borderBottomColor: theme === 'light' ? '#D4D4D4' : 'rgba(0, 0, 0, 0.3)'
          }}
          onPress={() => setModalVisible(true)}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text className="text-base font-bold uppercase tracking-widest text-center flex-1" style={{ color: colors.text }}>
            {selectedTranslation.abbreviation}
          </Text>
          <ChevronDown size={18} color={colors.text} />
        </TouchableOpacity>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View
            className="absolute top-32 left-4 right-4 rounded-xl p-4 shadow-lg shadow-black"
            style={{ elevation: 8, backgroundColor: colors.surface }}
          >
            <ScrollView>
              <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>Select Translation</Text>
              <View className="gap-3">
                {TRANSLATIONS.map((translation) => {
                  const isSelected = selectedTranslationId === translation.id;
                  return (
                    <TouchableOpacity
                      key={translation.id}
                      onPress={() => handleSelect(translation.id)}
                      className={`p-4 rounded-xl border flex-row justify-between items-center`}
                      style={{
                        backgroundColor: isSelected
                          ? (theme === 'light' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.2)')
                          : (theme === 'light' ? '#F0F0F0' : 'rgba(26, 26, 46, 0.6)'),
                        borderColor: isSelected
                          ? (theme === 'light' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.5)')
                          : (theme === 'light' ? '#E5E5E5' : 'rgba(255, 255, 255, 0.1)')
                      }}
                    >
                      <View className="flex-1 mr-4">
                        <View className="flex-row items-center mb-1">
                          <Text className="text-lg font-bold mr-2" style={{ color: colors.text }}>
                            {translation.abbreviation}
                          </Text>
                          {translation.language && (
                            <Text className="text-sm" style={{ color: colors.textSecondary }}>
                              {translation.language}
                            </Text>
                          )}
                        </View>
                        <Text className="text-sm" style={{ color: colors.textSecondary }}>
                          {translation.name}
                        </Text>
                      </View>
                      {isSelected && (
                        <View className="bg-gold rounded-full p-1">
                          <Check size={16} color="#FFF" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
