import React from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalaxyBackground } from '../../components/ui/GalaxyBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { Moon, Type, Bell, ChevronRight, User, Shield } from 'lucide-react-native';

export default function SettingsScreen() {
  const SettingItem = ({ icon, label, value, type = 'toggle' }: any) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-800">
      <View className="flex-row items-center">
        <View className="w-8 h-8 items-center justify-center rounded-full bg-gray-800 mr-3">
          {icon}
        </View>
        <Text className="text-base" style={{ color: '#FFFFFF' }}>{label}</Text>
      </View>
      {type === 'toggle' ? (
        <Switch
          value={value}
          trackColor={{ false: '#333', true: '#D4AF37' }}
          thumbColor="#FFF"
        />
      ) : (
        <ChevronRight size={20} color="#666" />
      )}
    </View>
  );

  return (
    <GalaxyBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text className="text-2xl font-bold mb-8" style={{ color: '#FFFFFF' }}>Settings</Text>

          <GlassCard style={{ marginBottom: 24, padding: 0 }}>
            <View className="p-4">
              <Text className="text-xs font-bold uppercase mb-2" style={{ color: '#D4AF37' }}>Appearance</Text>
              <SettingItem
                icon={<Moon size={18} color="#FFF" />}
                label="Dark Mode"
                value={true}
              />
              <SettingItem
                icon={<Type size={18} color="#FFF" />}
                label="Text Size"
                type="link"
              />
            </View>
          </GlassCard>

          <GlassCard style={{ marginBottom: 24, padding: 0 }}>
            <View className="p-4">
              <Text className="text-xs font-bold uppercase mb-2" style={{ color: '#D4AF37' }}>Notifications</Text>
              <SettingItem
                icon={<Bell size={18} color="#FFF" />}
                label="Daily Verse"
                value={true}
              />
            </View>
          </GlassCard>

          <GlassCard style={{ marginBottom: 24, padding: 0 }}>
            <View className="p-4">
              <Text className="text-xs font-bold uppercase mb-2" style={{ color: '#D4AF37' }}>Account</Text>
              <SettingItem
                icon={<User size={18} color="#FFF" />}
                label="Profile"
                type="link"
              />
              <SettingItem
                icon={<Shield size={18} color="#FFF" />}
                label="Privacy Policy"
                type="link"
              />
            </View>
          </GlassCard>

        </ScrollView>
      </SafeAreaView>
    </GalaxyBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
