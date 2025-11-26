import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search verses...' }: SearchBarProps) {
  const { colors, fontSizes } = useTheme();
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View className="flex-row items-center bg-galaxy-card rounded-xl px-4 py-2 border border-white/10">
      <Search size={20} color="#A0A0B0" />
      <TextInput
        className="flex-1 text-base text-white mx-2"
        value={query}
        onChangeText={handleSearch}
        placeholder={placeholder}
        placeholderTextColor="#666677"
        returnKeyType="search"
      />
      {query.length > 0 && (
        <TouchableOpacity className="p-1" onPress={handleClear}>
          <X size={20} color="#A0A0B0" />
        </TouchableOpacity>
      )}
    </View>
  );
}
