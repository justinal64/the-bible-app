import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Moon, Sun, Type, AlignLeft, Hash, User, LogOut } from 'lucide-react-native';
import { Spacing, BorderRadius } from '../../constants/theme';

export default function SettingsScreen() {
  const { colors, fontSizes, theme, fontSize, lineSpacing, verseNumbersVisible, toggleTheme, setFontSize, setLineSpacing, toggleVerseNumbers } = useTheme();
  const { user, signOut } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: fontSizes['2xl'],
      color: colors.text,
      fontWeight: '700',
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: Spacing.md,
    },
    section: {
      marginBottom: Spacing.xl,
    },
    sectionTitle: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: Spacing.sm,
      letterSpacing: 0.5,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    settingText: {
      flex: 1,
    },
    settingLabel: {
      fontSize: fontSizes.base,
      color: colors.text,
      fontWeight: '500',
      marginBottom: Spacing.xs,
    },
    settingValue: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    optionsContainer: {
      flexDirection: 'row',
      gap: Spacing.xs,
      flexWrap: 'wrap',
    },
    optionButton: {
      paddingVertical: Spacing.xs,
      paddingHorizontal: Spacing.md,
      backgroundColor: colors.surfaceSecondary,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    optionButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    optionButtonText: {
      fontSize: fontSizes.sm,
      color: colors.text,
      fontWeight: '500',
    },
    optionButtonTextActive: {
      color: '#ffffff',
    },
    userSection: {
      padding: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    userEmail: {
      fontSize: fontSizes.base,
      color: colors.text,
      fontWeight: '600',
    },
    signOutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.md,
      backgroundColor: colors.error,
      borderRadius: BorderRadius.md,
    },
    signOutButtonText: {
      fontSize: fontSizes.base,
      color: '#ffffff',
      fontWeight: '600',
      marginLeft: Spacing.sm,
    },
    signInButton: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.xl,
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
    },
    signInButtonText: {
      fontSize: fontSizes.base,
      color: '#ffffff',
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {user ? (
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <User size={28} color="#ffffff" />
              </View>
              <View>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
              <LogOut size={20} color="#ffffff" />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.userSection}>
            <Text style={[styles.settingLabel, { textAlign: 'center', marginBottom: Spacing.md }]}>
              Sign in to sync your data
            </Text>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <TouchableOpacity style={styles.settingItem} onPress={toggleTheme}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                {theme === 'light' ? (
                  <Sun size={20} color="#ffffff" />
                ) : (
                  <Moon size={20} color="#ffffff" />
                )}
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Theme</Text>
                <Text style={styles.settingValue}>
                  {theme === 'light' ? 'Light' : 'Dark'}
                </Text>
              </View>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#ffffff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reading</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Type size={20} color="#ffffff" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Font Size</Text>
                <View style={styles.optionsContainer}>
                  {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.optionButton,
                        fontSize === size && styles.optionButtonActive,
                      ]}
                      onPress={() => setFontSize(size)}
                    >
                      <Text
                        style={[
                          styles.optionButtonText,
                          fontSize === size && styles.optionButtonTextActive,
                        ]}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <AlignLeft size={20} color="#ffffff" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Line Spacing</Text>
                <View style={styles.optionsContainer}>
                  {(['compact', 'normal', 'relaxed'] as const).map((spacing) => (
                    <TouchableOpacity
                      key={spacing}
                      style={[
                        styles.optionButton,
                        lineSpacing === spacing && styles.optionButtonActive,
                      ]}
                      onPress={() => setLineSpacing(spacing)}
                    >
                      <Text
                        style={[
                          styles.optionButtonText,
                          lineSpacing === spacing && styles.optionButtonTextActive,
                        ]}
                      >
                        {spacing.charAt(0).toUpperCase() + spacing.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={toggleVerseNumbers}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Hash size={20} color="#ffffff" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Verse Numbers</Text>
                <Text style={styles.settingValue}>
                  {verseNumbersVisible ? 'Shown' : 'Hidden'}
                </Text>
              </View>
            </View>
            <Switch
              value={verseNumbersVisible}
              onValueChange={toggleVerseNumbers}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#ffffff"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
