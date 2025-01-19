import { Redirect, Stack } from 'expo-router';
import React from 'react';

import { useAuth } from '@/components/context/auth/AuthContext';

export default function UserLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }
  
  if(!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
      {/* Tabs layout */}
      <Stack.Screen
        name="currency/[code]"
        options={({ route }) => ({
          headerBackTitle: "Home",
          headerTitle: route.params?.code + " Balance" || "",
        })}
      />
      <Stack.Screen name="loading" />
    </Stack>
  );
}
