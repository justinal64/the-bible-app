import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { BookOpen, Search, Bookmark, Calendar, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#D4AF37', // Gold
        tabBarInactiveTintColor: '#A0A0B0',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 20,
          right: 20,
          backgroundColor: '#1A1A2E',
          borderRadius: 25,
          height: 60,
          borderTopWidth: 0,
          paddingBottom: 0, // Center icons vertically
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: 'transparent' }} />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reader"
        options={{
          title: 'Read',
          tabBarIcon: ({ size, color }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => <Settings size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          href: null, // Hide from tab bar but keep accessible
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          href: null, // Hide from tab bar but keep accessible
        }}
      />
    </Tabs>
  );
}
