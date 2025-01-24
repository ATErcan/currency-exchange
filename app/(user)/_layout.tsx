import { Redirect, router, Stack } from 'expo-router';
import React, { useEffect } from 'react';

import { useAuth } from '@/components/context/auth/AuthContext';
import { getUserInfo } from '@/tools/api';
import { deleteValueFor } from '@/utils/expo-secure-store';

export default function UserLayout() {
  const { user, isLoading, setIsLoading, setUser } = useAuth();

  const checkUser = async () => {
    setIsLoading(true);
    try {
      const { success, error } = await getUserInfo();
      if (error) {
        const { status } = error;
        if (status === 401) {
          await deleteValueFor("user_me");
          router.navigate("/login");
        }
        setUser(null);
      } else if (success) {
        setUser(success.res.data);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkUser();
  }, [])

  if (isLoading) {
    return null;
  }

  if(!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="tabs"
        options={{ headerShown: false, gestureEnabled: false }}
      />
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
        options={{
          headerBackTitle: "Transactions",
          headerTitle: "Fund Amount",
        }}
      />
      <Stack.Screen
        name="exchange"
        options={{ headerBackTitle: "Transactions", headerTitle: "Exchange" }}
      />
      <Stack.Screen
        name="add-funds"
        options={{ headerBackTitle: "Fund Amount", headerTitle: "Add Funds" }}
      />
      <Stack.Screen
        name="transaction-success"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="generate-graph"
        options={{ headerBackTitle: "Archive", headerTitle: "Get Rates" }}
      />
      <Stack.Screen
        name="rate-graph"
        options={{ headerBackTitle: "Generate Graph", headerTitle: "Rate Graph" }}
      />
      <Stack.Screen name="loading" />
    </Stack>
  );
}
