import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from './ui/Button';

interface ChapterSelectorProps {
  totalChapters: number;
  currentChapter: number;
  onSelectChapter: (chapter: number) => void;
}

export function ChapterSelector({
  totalChapters,
  currentChapter,
  onSelectChapter,
}: ChapterSelectorProps) {
  return (
    <ScrollView className="bg-galaxy-bg py-4">
      <View className="flex-row flex-wrap px-2 justify-center gap-2">
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map((chapter) => (
          <View key={chapter} className="w-16 h-16">
            <Button
              title={chapter.toString()}
              onPress={() => onSelectChapter(chapter)}
              variant={currentChapter === chapter ? 'primary' : 'outline'}
              size="sm"
              style={{ width: '100%', height: '100%', paddingHorizontal: 0, paddingVertical: 0 }}
              textStyle={{ fontSize: 16 }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
