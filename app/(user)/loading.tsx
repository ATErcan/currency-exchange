import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/components/context/auth/AuthContext';

export default function WelcomeScreen() {
  const { logout } = useAuth();
  return (
    <>
      <ThemedView className="flex-1 items-center justify-center p-5">
        <ThemedText type="title" className="text-center">
          Loading... Please Wait
        </ThemedText>
        <ThemedText type="title" className="text-center" onPress={logout}>
          logout
        </ThemedText>
      </ThemedView>
    </>
  );
}
