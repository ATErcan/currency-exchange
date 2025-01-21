import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAllCurrencies, getFinancials } from "@/tools/api";
import { Rate } from "@/lib/types/rates.type";
import { getCountriesByCurrency } from "@/utils/getCountry";
import { ThemedIconSymbol } from "@/components/ThemedIconSymbol";
import CurrencyDropdown from "@/components/currency/CurrencyDropdown";
import { UserFinancial } from "@/lib/types/currencies.type";
import { formatAmount, formatNumber, roundToPrecision } from "@/utils/formatDecimalSeperator";
import { calculateRate } from "@/utils/currencyFunctions";
import { BASE_CURRENCY } from "@/constants/utilsConstants";



const baseToCurrency = {
  currency: "United States of America",
  code: "USD",
  mid: 4.0
}

export default function ExchangeScreen() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [currencies, setCurrencies] = useState<Rate[]>([BASE_CURRENCY]);
  const [userFinancial, setUserFinancial] = useState<UserFinancial>();
  const [fromCurrency, setFromCurrency] = useState<Rate>(BASE_CURRENCY);
  const [toCurrency, setToCurrency] = useState<Rate>(baseToCurrency);

  async function fetchCurrencies() {
    try {
      const [tableA, tableB] = await getAllCurrencies();
      if(tableA.status === "fulfilled") {
        setCurrencies(prevCurrencies => [...prevCurrencies, ...tableA.value.rates])
      }
      if(tableB.status === "fulfilled") {
        setCurrencies(prevCurrencies => [...prevCurrencies, ...tableB.value.rates])
      }
      if(tableA.status === "rejected" || tableB.status === "rejected") {
        Toast.show({
          type: "error",
          text1: "Failed to get all currencies",
        });
      }
    } catch(error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
    } finally {
      setIsFetching(false);
    }
  }

  async function getFinancialData() {
    const { success, error } = await getFinancials();
    if(error) {
      Toast.show({
        type: "error",
        text1: error.data.message
      });
    } else if(success) {
      const data = success?.res.data.data;
      setUserFinancial(data);
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
      });
    }
  }

  useEffect(() => {
    fetchCurrencies();
    try {
      getFinancialData();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
      });
    }
  }, [])

  useEffect(() => {
    const filteredCurrencies = currencies.filter((currency) =>
      getCountriesByCurrency(currency.code)
    );
    setCurrencies(filteredCurrencies);
    setLoading(false);
  }, [isFetching])

  const handleSelectFromCurrency = useCallback((index: string) => {
    setFromCurrency(currencies[+index]);
  }, [currencies]);

  const handleSelectToCurrency = useCallback((index: string) => {
    setToCurrency(currencies[+index]);
  }, [currencies]);

  const fromCurrencyBalance = useMemo(() => {
    if(fromCurrency.code === "PLN" && userFinancial) return formatAmount(roundToPrecision(userFinancial?.balance));

    const selectedCurrency = userFinancial?.currencies.find(currency => currency.code === fromCurrency.code);
    return selectedCurrency ? formatAmount(roundToPrecision(selectedCurrency.amount)) : "0,00";
  }, [userFinancial, fromCurrency])

  const exchangeRate = useMemo(() =>
    calculateRate(fromCurrency.mid, toCurrency.mid),
    [fromCurrency, toCurrency]
  );

  return (
    <ThemedScrollView
      className="px-4 py-6"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View>
        <ThemedText type="title" className="mb-2">
          Exchange
        </ThemedText>
        <View className="mt-2">
          <ThemedView
            className="w-full h-16 flex-row items-center justify-between gap-2 pr-4 border border-gray-300 rounded-2xl"
            lightColor="#e5e7eb"
            darkColor="#262626"
          >
            <TextInput
              keyboardType="numeric"
              className="flex-1 h-full p-2 text-3xl text-gray-300"
              placeholder="0,00"
            />
            {/* // TODO: check out key props warning */}
            <CurrencyDropdown
              currencies={currencies}
              onSelect={handleSelectFromCurrency}
              loading={loading}
              code={fromCurrency.code}
            />
          </ThemedView>
          <ThemedText style={{ fontSize: 14, lineHeight: 20 }} lightColor="#737373" darkColor="#e5e7eb">
            You have <Text className="font-bold underline ">{fromCurrency.code} {fromCurrencyBalance}</Text> in your balance
          </ThemedText>
        </View>
        <View className="flex-row justify-between gap-2 my-12">
          <View className="flex-row items-center gap-2">
            <ThemedView
              className="w-7 h-7 rounded-full items-center justify-center overflow-hidden"
              lightColor="#e5e7eb"
              darkColor="#262626"
            >
              <ThemedIconSymbol size={12} name="multiply" lightColor="#262626" darkColor="#e5e7eb" />
            </ThemedView>
            <ThemedText lightColor="#262626" darkColor="#e5e7eb">{formatAmount(exchangeRate)}</ThemedText>
          </View>
          <ThemedText lightColor="#262626" darkColor="#e5e7eb">Exchange Rate</ThemedText>
        </View>
        <View>
          <ThemedText style={{ fontSize: 14, lineHeight: 20 }} lightColor="#737373" darkColor="#e5e7eb">
            To your {toCurrency.code} balance
          </ThemedText>
          <ThemedView
            className="w-full h-16 flex-row items-center justify-between gap-2 pr-4 border border-gray-300 rounded-2xl"
            lightColor="#e5e7eb"
            darkColor="#262626"
          >
            <TextInput
              keyboardType="numeric"
              className="flex-1 h-full p-2 text-3xl text-gray-300"
              placeholder="0,00"
              editable={false}
            />
            {/* // TODO: check out key props warning */}
            <CurrencyDropdown
              currencies={currencies}
              onSelect={handleSelectToCurrency}
              loading={loading}
              code={toCurrency.code}
            />
          </ThemedView>
        </View>
      </View>
      <TouchableOpacity className="bg-blue-500 px-12 py-4 rounded-2xl mb-8">
        <ThemedText className="text-center font-bold" lightColor="#e5e7eb">
          Exchange
        </ThemedText>
      </TouchableOpacity>
    </ThemedScrollView>
  );
}
