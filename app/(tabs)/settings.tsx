import React from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Moon, Sun, Type, AlignLeft, Hash, User, LogOut } from 'lucide-react-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function SettingsScreen() {
  const { colors, fontSizes, theme, fontSize, lineSpacing, verseNumbersVisible, toggleTheme, setFontSize, setLineSpacing, toggleVerseNumbers } = useTheme();
  const { user, signOut } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: fontSizes['2xl'],
      color: colors.text,
      fontWeight: '800',
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: Spacing.md,
      gap: Spacing.lg,
    },
    sectionTitle: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      fontWeight: '700',
      textTransform: 'uppercase',
      marginBottom: Spacing.sm,
      letterSpacing: 1,
      marginLeft: Spacing.xs,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.lg,
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
      fontWeight: '700',
      marginBottom: 2,
    },
    settingValue: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    optionsContainer: {
      flexDirection: 'row',
      gap: Spacing.sm,
      flexWrap: 'wrap',
      marginTop: Spacing.sm,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
      borderWidth: 3,
      borderColor: colors.secondaryDark,
    },
    userEmail: {
      fontSize: fontSizes.lg,
      color: colors.text,
      fontWeight: '700',
    },
    signInText: {
      textAlign: 'center',
      marginBottom: Spacing.md,
      fontSize: fontSizes.base,
      color: colors.textSecondary,
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
          <Card padding="lg">
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <User size={32} color="#ffffff" />
              </View>
              <View>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>
            <Button
              title="Sign Out"
              onPress={signOut}
              variant="danger"
              icon={<LogOut size={20} color="#ffffff" />}
            />
          </Card>
        ) : (
          <Card padding="lg">
            <Text style={styles.signInText}>
              Sign in to sync your data
            </Text>
            <Button title="Sign In" onPress={() => {}} />
          </Card>
        )}

        <View>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <Card>
            <TouchableOpacity style={styles.settingItem} onPress={toggleTheme} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: theme === 'light' ? colors.warning : colors.secondary }]}>
                  {theme === 'light' ? (
                    <Sun size={24} color="#ffffff" />
                  ) : (
                    <Moon size={24} color="#ffffff" />
                  )}
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Theme</Text>
                  <Text style={styles.settingValue}>
                    {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
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
          </Card>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Reading</Text>
          <Card padding="lg">
            <View style={[styles.settingItem, { marginBottom: Spacing.md }]}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: colors.secondary }]}>
                  <Type size={24} color="#ffffff" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Font Size</Text>
                </View>
              </View>
            </View>
            <View style={styles.optionsContainer}>
              {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
                <View key={size} style={{ flex: 1 }}>
                  <Button
                    title={size === 'xlarge' ? 'XL' : size.charAt(0).toUpperCase() + size.slice(1)}
                    onPress={() => setFontSize(size)}
                    variant={fontSize === size ? 'primary' : 'outline'}
                    size="sm"
                  />
                </View>
              ))}
            </View>
          </Card>

          <View style={{ height: Spacing.md }} />

          <Card padding="lg">
            <View style={[styles.settingItem, { marginBottom: Spacing.md }]}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: colors.highlight.purple }]}>
                  <AlignLeft size={24} color="#ffffff" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Line Spacing</Text>
                </View>
              </View>
            </View>
            <View style={styles.optionsContainer}>
              {(['compact', 'normal', 'relaxed'] as const).map((spacing) => (
                <View key={spacing} style={{ flex: 1 }}>
                  <Button
                    title={spacing.charAt(0).toUpperCase() + spacing.slice(1)}
                    onPress={() => setLineSpacing(spacing)}
                    variant={lineSpacing === spacing ? 'primary' : 'outline'}
                    size="sm"
                  />
                </View>
              ))}
            </View>
          </Card>

          <View style={{ height: Spacing.md }} />

          <Card>
            <TouchableOpacity style={styles.settingItem} onPress={toggleVerseNumbers} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: colors.highlight.pink }]}>
                  <Hash size={24} color="#ffffff" />
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
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
