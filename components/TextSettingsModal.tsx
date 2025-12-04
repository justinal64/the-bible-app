import React from 'react';
import { View, Text, TouchableOpacity, Modal, Switch } from 'react-native';
import { X, Minus, Plus, Type, AlignLeft, AlignCenter, AlignJustify } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { GlassCard } from './ui/GlassCard';

interface TextSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function TextSettingsModal({ visible, onClose }: TextSettingsModalProps) {
  const {
    fontSize,
    setFontSize,
    lineSpacing,
    setLineSpacing,
    verseNumbersVisible,
    toggleVerseNumbers,
    colors,
    theme
  } = useTheme();

  const fontSizesList = ['small', 'medium', 'large', 'xlarge'] as const;
  const lineSpacingsList = ['compact', 'normal', 'relaxed'] as const;

  const handleDecreaseFont = () => {
    const currentIndex = fontSizesList.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizesList[currentIndex - 1]);
    }
  };

  const handleIncreaseFont = () => {
    const currentIndex = fontSizesList.indexOf(fontSize);
    if (currentIndex < fontSizesList.length - 1) {
      setFontSize(fontSizesList[currentIndex + 1]);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50"
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="flex-1 justify-end">
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View
              className="rounded-t-3xl p-6 pb-10"
              style={{ backgroundColor: colors.surface }}
            >
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold" style={{ color: colors.text }}>Text Settings</Text>
                <TouchableOpacity onPress={onClose} className="p-2 bg-gray-800/50 rounded-full" style={{ backgroundColor: theme === 'light' ? '#E5E5E5' : 'rgba(31, 41, 55, 0.5)' }}>
                  <X size={20} color={colors.text} />
                </TouchableOpacity>
              </View>

              {/* Font Size */}
              <View className="mb-6">
                <Text className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: colors.textSecondary }}>Font Size</Text>
                <View className="flex-row items-center justify-between bg-gray-800/30 rounded-xl p-2" style={{ backgroundColor: theme === 'light' ? '#F0F0F0' : 'rgba(31, 41, 55, 0.3)' }}>
                  <TouchableOpacity
                    onPress={handleDecreaseFont}
                    className="p-3 bg-gray-700/50 rounded-lg"
                    style={{ backgroundColor: theme === 'light' ? '#FFF' : 'rgba(55, 65, 81, 0.5)' }}
                  >
                    <Minus size={20} color={colors.text} />
                  </TouchableOpacity>

                  <Text className="text-xl font-serif" style={{ color: colors.text }}>Aa</Text>

                  <TouchableOpacity
                    onPress={handleIncreaseFont}
                    className="p-3 bg-gray-700/50 rounded-lg"
                    style={{ backgroundColor: theme === 'light' ? '#FFF' : 'rgba(55, 65, 81, 0.5)' }}
                  >
                    <Plus size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Line Spacing */}
              <View className="mb-6">
                <Text className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: colors.textSecondary }}>Line Spacing</Text>
                <View className="flex-row gap-3">
                  {lineSpacingsList.map((spacing) => (
                    <TouchableOpacity
                      key={spacing}
                      onPress={() => setLineSpacing(spacing)}
                      className={`flex-1 py-3 rounded-xl items-center justify-center border ${
                        lineSpacing === spacing
                          ? 'bg-gold/20 border-gold'
                          : 'bg-gray-800/30 border-transparent'
                      }`}
                      style={{
                        backgroundColor: lineSpacing === spacing
                          ? (theme === 'light' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.2)')
                          : (theme === 'light' ? '#F0F0F0' : 'rgba(31, 41, 55, 0.3)'),
                        borderColor: lineSpacing === spacing
                          ? '#D4AF37'
                          : 'transparent'
                      }}
                    >
                      {spacing === 'compact' && <AlignJustify size={24} color={lineSpacing === spacing ? '#D4AF37' : colors.textSecondary} />}
                      {spacing === 'normal' && <AlignLeft size={24} color={lineSpacing === spacing ? '#D4AF37' : colors.textSecondary} />}
                      {spacing === 'relaxed' && <AlignCenter size={24} color={lineSpacing === spacing ? '#D4AF37' : colors.textSecondary} />}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Verse Numbers */}
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-base font-bold" style={{ color: colors.text }}>Show Verse Numbers</Text>
                <Switch
                  value={verseNumbersVisible}
                  onValueChange={toggleVerseNumbers}
                  trackColor={{ false: theme === 'light' ? '#E5E5E5' : '#374151', true: '#D4AF37' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
