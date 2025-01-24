import { useCallback, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import CurrencyCard from '@/components/currency/CurrencyCard';
import Transactions from '@/components/currency/Transactions';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { getFinancials } from '@/tools/api';
import { Currency } from '@/lib/types/currencies.type';
import { SingleCurrency } from '@/lib/types/currencies.type';
import { ThemedIconSymbol } from '@/components/ThemedIconSymbol';

export default function HomeScreen() {
  const [baseCurrency, setBaseCurrency] = useState<SingleCurrency>({
    code: "PLN",
    amount: 0
  });
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const bottom = useBottomTabOverflow();

  useEffect(() => {
    try {
      getFinancialData();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong, try again later."
      });
      resetValuesOnError();
    } finally {
      setLoading(false);
    }
  }, [])

  async function getFinancialData() {
    const { success, error } = await getFinancials();
    if(error) {
      Toast.show({
        type: "error",
        text1: error.data.message
      });
      resetValuesOnError();
    } else if(success) {
      const { balance, baseCurrency, currencies } = success?.res.data.data;
      setBaseCurrency({
        code: baseCurrency,
        amount: balance
      })
      setCurrencies(currencies);
    }
  }

  const resetValuesOnError = useCallback(() => {
    setBaseCurrency({
      code: "PLN",
      amount: 0,
    });
    setCurrencies((prevCurrencies) =>
      prevCurrencies.map((currency) => {
        return {
          ...currency,
          amount: 0,
        };
      })
    );
  }, []);

  return (
    <ThemedScrollView className="p-4" contentContainerStyle={{ paddingBottom: bottom }}>
      <View className="flex-row gap-2 my-3">
        <ThemedView className="gap-2 mb-1 rounded-2xl self-start px-1" lightColor="#e5e7eb" darkColor="#262626">
          <Link href={{
            pathname: "/fund-amount",
            params: { baseCurrency: baseCurrency.code }
          }}>
            <View className="flex-row items-center py-1.5 px-2">
              <ThemedIconSymbol size={16} name="plus" lightColor="#262626" darkColor="#e5e7eb" />
              <ThemedText className="ml-2 font-medium" lightColor="#262626" darkColor="#e5e7eb">
                Add Funds
              </ThemedText>
            </View>
          </Link>
        </ThemedView>
        <ThemedView className="gap-2 mb-1 rounded-2xl self-start px-2" lightColor="#e5e7eb" darkColor="#262626">
          <Link href="/exchange">
            <View className="flex-row items-center py-1.5 px-2">
              <ThemedIconSymbol size={16} name="arrow.left.and.right" lightColor="#262626" darkColor="#e5e7eb" />
              <ThemedText className="ml-2 font-medium" lightColor="#262626" darkColor="#e5e7eb">
                Exchange
              </ThemedText>
            </View>
          </Link>
        </ThemedView>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6"
      >
        <View className="flex-row gap-4">
          <CurrencyCard code={baseCurrency.code} amount={baseCurrency.amount} loading={loading} />
          {currencies.map((currency) => (
            <CurrencyCard
              key={currency._id}
              code={currency.code}
              amount={currency.amount}
              loading={loading}
            />
          ))}
        </View>
      </ScrollView>
      
      <Transactions baseCurrency={baseCurrency.code} isSummary={true} />
    </ThemedScrollView>
  );
}