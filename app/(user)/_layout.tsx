import { Redirect, Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/components/context/auth/AuthContext';
import Avatar from '@/components/ui/Avatar';

export default function UserLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useAuth();
  console.log(user);

  if (isLoading) {
    return null;
  }
  
  if(!user) {
    <Redirect href="/login" />
  }
  console.log(user?.data.name)
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
        headerLeft: () => <Avatar name={user?.data.name} />
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: () => null,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
