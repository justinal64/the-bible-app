import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Search, X } from 'lucide-react-native';
import { Spacing, BorderRadius } from '../constants/theme';

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

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    input: {
      flex: 1,
      fontSize: fontSizes.base,
      color: colors.text,
      marginLeft: Spacing.sm,
      marginRight: Spacing.sm,
    },
    iconButton: {
      padding: Spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <Search size={20} color={colors.textSecondary} />
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        returnKeyType="search"
      />
      {query.length > 0 && (
        <TouchableOpacity style={styles.iconButton} onPress={handleClear}>
          <X size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}
