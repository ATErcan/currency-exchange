import { View, ScrollView } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CurrencyCard from '@/components/currency/CurrencyCard';
import Transactions from '@/components/currency/Transactions';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';

export default function HomeScreen() {
  const bottom = useBottomTabOverflow();

  return (
    <ThemedScrollView className="p-4" contentContainerStyle={{ paddingBottom: bottom }}>
      <ThemedView className="gap-2 mb-1">
        <ThemedText>Total Balance</ThemedText>
      </ThemedView>
      <ThemedView className="flex-row items-center gap-2">
        <ThemedText type="title">100 PLN</ThemedText>
      </ThemedView>
      <View className="flex-row gap-2 my-3">
        <ThemedView className="gap-2 mb-1 rounded-2xl self-start px-1" lightColor="#e5e7eb">
          {/* TODO: Change to add-funds when created */}
          <Link href="/explore">
            <View className="flex-row items-center py-1.5 px-2">
              <IconSymbol size={16} name="plus" color="black" />
              <ThemedText className="ml-2 font-medium">Add Funds</ThemedText>
            </View>
          </Link>
        </ThemedView>
        <ThemedView className="gap-2 mb-1 rounded-2xl self-start px-2" lightColor="#e5e7eb">
          {/* TODO: Change to exchange when created */}
          <Link href="/explore">
            <View className="flex-row items-center py-1.5 px-2">
              <IconSymbol size={16} name="arrow.left.and.right" color="black" />
              <ThemedText className="ml-2 font-medium">Exchange</ThemedText>
            </View>
          </Link>
        </ThemedView>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
        <View className="flex-row gap-4">
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />
        </View>
      </ScrollView>
      <Transactions />
    </ThemedScrollView>
  );
}