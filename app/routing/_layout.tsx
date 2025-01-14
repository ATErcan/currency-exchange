import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useAuth } from '@/components/context/auth/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RoutingLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack>
      {user ? (
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(guest)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
