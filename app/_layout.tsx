import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import "../styles/global.css"
import { useColorScheme } from '@/hooks/useColorScheme';
import AuthProvider from '@/components/context/auth/AuthContext';
import { Platform, UIManager } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  console.log("root")
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName='index'>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='login' options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name='signup' options={{ headerShown: false }} />
          <Stack.Screen name='(user)' options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name='+not-found' options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </ThemeProvider>
    </AuthProvider>
  );
}
