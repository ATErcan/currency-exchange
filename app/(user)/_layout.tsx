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
      <Stack.Screen name="tabs" options={{ headerShown: false, gestureEnabled: false }} />
      {/* Tabs layout */}
      <Stack.Screen
        name="currency/[code]"
        options={({ route }) => ({
          headerBackTitle: "Home",
          headerTitle: route.params?.code + " Balance" || "",
        })}
      />
      <Stack.Screen
        name="fund-amount"
        options={{ headerBackTitle: "Transactions", headerTitle: "Fund Amount" }}
      />
      <Stack.Screen
        name="exchange"
        options={{ headerBackTitle: "Transactions", headerTitle: "Exchange" }}
      />
      <Stack.Screen
        name="add-funds"
        options={{ headerBackTitle: "Fund Amount", headerTitle: "Add Funds" }}
      />
      <Stack.Screen name="transaction-success" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="loading" />
    </Stack>
  );
}
