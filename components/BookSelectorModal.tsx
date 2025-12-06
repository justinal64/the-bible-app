import React from 'react';
import { View, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from './ui/GalaxyBackground';
import { Button } from './ui/Button';
import { BookSelector } from './BookSelector';

interface BookSelectorModalProps {
  visible: boolean;
  onClose: () => void;
}

export function BookSelectorModal({ visible, onClose }: BookSelectorModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <GalaxyBackground>
        <SafeAreaView className="flex-1" edges={['top']}>
          <View className="p-4 flex-row justify-end">
            <Button title="Close" onPress={onClose} variant="ghost" size="sm" />
          </View>
          <BookSelector onClose={onClose} />
        </SafeAreaView>
      </GalaxyBackground>
    </Modal>
  );
}
