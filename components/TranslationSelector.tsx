import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown } from 'lucide-react-native';

interface Translation {
  id: string;
  name: string;
  abbreviation: string;
}

export const TRANSLATIONS: Translation[] = [
  { id: 'de4e12af7f28f599-01', name: 'King James Version', abbreviation: 'KJV' },
  { id: '06125adad2d5898a-01', name: 'American Standard Version', abbreviation: 'ASV' },
  { id: '9879dbb7cfe39e4d-01', name: 'World English Bible', abbreviation: 'WEB' },
];

interface TranslationSelectorProps {
  selectedTranslationId: string;
  onTranslationChange: (translationId: string) => void;
}

export function TranslationSelector({ selectedTranslationId, onTranslationChange, children }: TranslationSelectorProps & { children?: React.ReactNode }) {
  const { colors } = useTheme();
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
          style={{ transform: [{ translateY: isPressed ? 2 : 0 }] }}
          onPress={() => setModalVisible(true)}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text className="text-white text-base font-bold uppercase tracking-widest text-center flex-1">
            {selectedTranslation.abbreviation}
          </Text>
          <ChevronDown size={18} color="#FFFFFF" />
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
            className="absolute top-32 left-4 right-4 bg-galaxy-card rounded-xl p-4 shadow-lg shadow-black"
            style={{ elevation: 8 }}
          >
            <Text className="text-lg font-bold text-white mb-4">
              Select Translation
            </Text>

            {TRANSLATIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
                className={`flex-row justify-between items-center py-4 px-4 rounded-lg mb-1 ${item.id === selectedTranslationId ? 'bg-gold/20' : 'bg-transparent'}`}
                onPress={() => handleSelect(item.id)}
              >
                <View>
                  <Text className="text-base font-bold text-white">
                    {item.abbreviation}
                  </Text>
                  <Text className="text-sm text-text-secondary">
                    {item.name}
                  </Text>
                </View>
                {item.id === selectedTranslationId && (
                  <Text className="text-xl text-gold">✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
