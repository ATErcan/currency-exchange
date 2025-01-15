import React from 'react';
import { Link, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function WelcomeScreen() {
  return (
    <>
      <ThemedView className='flex-1 items-center justify-center p-5'>
        <ThemedText type="title" className='text-center'>Loading... Please Wait</ThemedText>
      </ThemedView>
    </>
  );
}
