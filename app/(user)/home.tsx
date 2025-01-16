import { StyleSheet, Platform, View } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  return (
    <ThemedScrollView className="p-4">
      <ThemedView className="gap-2 mb-1">
        <ThemedText>Total Balance</ThemedText>
      </ThemedView>
      <ThemedView className="flex-row items-center gap-2">
        <ThemedText type="title">100 PLN</ThemedText>
      </ThemedView>
      <View className='flex-row gap-2 my-3'>
        <ThemedView className="gap-2 mb-1 rounded-2xl self-start px-1" lightColor='#e5e7eb'>
          {/* TODO: Change to add-funds when created */}
          <Link href="/explore">
            <View className="flex-row items-center py-1.5 px-2">
              <IconSymbol size={16} name="plus" color="black" />
              <ThemedText className="ml-2 font-medium">
                Add Funds
              </ThemedText>
            </View>
          </Link>
        </ThemedView>
        <ThemedView className="gap-2 mb-1 rounded-2xl self-start px-2" lightColor='#e5e7eb'>
          {/* TODO: Change to exchange when created */}
          <Link href="/explore">
            <View className="flex-row items-center py-1.5 px-2">
              <IconSymbol size={16} name="arrow.left.and.right" color="black" />
              <ThemedText className="ml-2 font-medium">
                Exchange
              </ThemedText>
            </View>
          </Link>
        </ThemedView>
      </View>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
