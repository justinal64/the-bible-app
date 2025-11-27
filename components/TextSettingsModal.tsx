import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import { Button } from './ui/Button';
import { useTheme } from '../contexts/ThemeContext';

interface TextSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function TextSettingsModal({ visible, onClose }: TextSettingsModalProps) {
  const { fontSize, setFontSize } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50 justify-center items-center"
        activeOpacity={1}
        onPress={onClose}
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

          <Button title="Done" onPress={onClose} variant="primary" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
