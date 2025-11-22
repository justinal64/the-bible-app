import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown } from 'lucide-react-native';
import { BorderRadius, Spacing, FontSizes } from '../constants/theme';

interface Translation {
  id: string;
  name: string;
  abbreviation: string;
}

const TRANSLATIONS: Translation[] = [
  { id: 'de4e12af7f28f599-01', name: 'King James Version', abbreviation: 'KJV' },
  { id: '06125adad2d5898a-01', name: 'American Standard Version', abbreviation: 'ASV' },
  { id: '9879dbb7cfe39e4d-01', name: 'World English Bible', abbreviation: 'WEB' },
];

interface TranslationSelectorProps {
  selectedTranslationId: string;
  onTranslationChange: (translationId: string) => void;
}

export function TranslationSelector({ selectedTranslationId, onTranslationChange }: TranslationSelectorProps) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const selectedTranslation = TRANSLATIONS.find(t => t.id === selectedTranslationId) || TRANSLATIONS[0];

  const handleSelect = (translationId: string) => {
    onTranslationChange(translationId);
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      backgroundColor: colors.secondary,
      borderRadius: BorderRadius.xl,
      borderWidth: 2,
      borderColor: colors.secondary,
      borderBottomWidth: 4,
      borderBottomColor: colors.secondaryDark,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.lg,
      transform: [{ translateY: isPressed ? 2 : 0 }],
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: FontSizes.medium.base,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1,
      textAlign: 'center',
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => setModalVisible(true)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <Text style={styles.buttonText}>
          {selectedTranslation.abbreviation}
        </Text>
        <ChevronDown size={18} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={{
            position: 'absolute',
            top: 120, // Position below the header
            left: Spacing.md,
            right: Spacing.md,
            backgroundColor: colors.surface,
            borderRadius: BorderRadius.lg,
            padding: Spacing.md,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}>
            <Text style={{
              fontSize: FontSizes.medium.lg,
              fontWeight: '700',
              color: colors.text,
              marginBottom: Spacing.md,
            }}>
              Select Translation
            </Text>

            {TRANSLATIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: Spacing.md,
                  paddingHorizontal: Spacing.md,
                  borderRadius: BorderRadius.md,
                  backgroundColor: item.id === selectedTranslationId ? colors.primary + '20' : 'transparent',
                  marginBottom: Spacing.xs,
                }}
                onPress={() => handleSelect(item.id)}
              >
                <View>
                  <Text style={{
                    fontSize: FontSizes.medium.base,
                    fontWeight: '600',
                    color: colors.text,
                  }}>
                    {item.abbreviation}
                  </Text>
                  <Text style={{
                    fontSize: FontSizes.medium.sm,
                    color: colors.textSecondary,
                  }}>
                    {item.name}
                  </Text>
                </View>
                {item.id === selectedTranslationId && (
                  <Text style={{ fontSize: 20, color: colors.primary }}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
