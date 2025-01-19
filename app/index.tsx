import React from 'react';
import { Link, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function WelcomeScreen() {
  console.log("welcome")
  return (
    <>
      <Stack.Screen options={{ title: 'Welcome!' }} />
      <ThemedView className='flex-1 items-center justify-center p-5'>
        <ThemedText type="title" className='text-center'>Welcome to Currency Exchange App</ThemedText>
        <Link href="/(user)/tabs/home" className='mt-4 py-4'>
          <ThemedText type="link">Let's Start</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
