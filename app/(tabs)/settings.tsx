import React from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
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
        <Text className="text-base text-text-primary">{label}</Text>
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

  const [showTextSettings, setShowTextSettings] = React.useState(false);
  const { fontSize, setFontSize } = useTheme();

  return (
    <GalaxyBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView contentContainerClassName="p-5">
          <Text className="text-2xl font-bold mb-8 text-text-primary">Settings</Text>

          <GlassCard style={{ marginBottom: 24, padding: 0 }}>
            <View className="p-4">
              <Text className="text-xs font-bold uppercase mb-2 text-gold">Appearance</Text>
              <SettingItem
                icon={<Moon size={18} color="#FFF" />}
                label="Dark Mode"
                value={true}
              />
              <TouchableOpacity onPress={() => setShowTextSettings(true)}>
                <View className="flex-row items-center justify-between py-4 border-b border-gray-800">
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 items-center justify-center rounded-full bg-gray-800 mr-3">
                      <Type size={18} color="#FFF" />
                    </View>
                    <Text className="text-base text-text-primary">Text Size</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-400 mr-2 capitalize">{fontSize}</Text>
                    <ChevronRight size={20} color="#666" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </GlassCard>

          <GlassCard style={{ marginBottom: 24, padding: 0 }}>
            <View className="p-4">
              <Text className="text-xs font-bold uppercase mb-2 text-gold">Notifications</Text>
              <SettingItem
                icon={<Bell size={18} color="#FFF" />}
                label="Daily Verse"
                value={true}
              />
            </View>
          </GlassCard>

          <GlassCard style={{ marginBottom: 24, padding: 0 }}>
            <View className="p-4">
              <Text className="text-xs font-bold uppercase mb-2 text-gold">Account</Text>
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

        {/* Text Settings Modal */}
        <Modal
          visible={showTextSettings}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowTextSettings(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center items-center"
            activeOpacity={1}
            onPress={() => setShowTextSettings(false)}
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

              <View className="items-center">
                <TouchableOpacity onPress={() => setShowTextSettings(false)} className="bg-primary px-6 py-2 rounded-full">
                    <Text className="text-white font-bold">Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </GalaxyBackground>
  );
}
