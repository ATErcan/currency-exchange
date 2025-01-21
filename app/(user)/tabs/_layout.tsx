import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { useAuth } from "@/components/context/auth/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/components/HapticTab";
import BlurTabBarBackground from "@/components/ui/TabBarBackground.ios";
import Avatar from "@/components/ui/Avatar";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: BlurTabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        headerLeft: () => <Avatar name={user?.data.name} />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: () => null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dollarsign.circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Transaction History",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="clock.arrow.2.circlepath" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
