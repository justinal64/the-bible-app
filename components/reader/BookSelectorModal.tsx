import React from 'react';
import { View, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../ui/GalaxyBackground';
import { BookSelector } from '../BookSelector';
import { Button } from '../ui/Button';

interface BookSelectorModalProps {
  visible: boolean;
  currentBookId: number;
  onSelect: (bookId: number, chapter: number) => void;
  onClose: () => void;
}

export function BookSelectorModal({
  visible,
  currentBookId,
  onSelect,
  onClose,
}: BookSelectorModalProps) {
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
          <BookSelector
            onSelect={onSelect}
            currentBookId={currentBookId}
          />
        </SafeAreaView>
      </GalaxyBackground>
    </Modal>
  );
}
