import { useEffect, useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';

import CircleFlag from "@/components/currency/CircleFlag";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAllCurrencies } from "@/tools/api";
import { Rate } from "@/lib/types/rates.type";
import Toast from "react-native-toast-message";
import { getAllISOByCurrencyOrSymbol } from "iso-country-currency";
import { getCountriesByCurrency } from "@/utils/getCountry";
import { ThemedIconSymbol } from "@/components/ThemedIconSymbol";

const baseCurrency = {
  currency: "Polska",
  code: "PLN",
  mid: 1
}

const baseToCurrency = {
  currency: "United States of America",
  code: "USD",
  mid: 4.0
}

export default function ExchangeScreen() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [currencies, setCurrencies] = useState<Rate[]>([]);
  const [fromCurrency, setFromCurrency] = useState<Rate>(baseCurrency);
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

  useEffect(() => {
    fetchCurrencies();
  }, [])

  useEffect(() => {
    const filteredCurrencies = currencies.filter((currency) =>
      getCountriesByCurrency(currency.code)
    );
    setCurrencies(filteredCurrencies);
    setLoading(false);
  }, [isFetching])

  const handleSelectFromCurrency = (index: string) => {
    setFromCurrency(currencies[+index]);
  };
  const handleSelectToCurrency = (index: string) => {
    setToCurrency(currencies[+index]);
  };

  const country = useMemo(() => (
    getCountriesByCurrency(fromCurrency.code)
  ), [fromCurrency])

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
            <ModalDropdown
              options={currencies.map((currency) => currency.code)}
              dropdownStyle={{ width: 120, height: 300 }}
              dropdownTextStyle={{ fontSize: 16, padding: 8 }}
              textStyle={{ color: "#000", fontSize: 18 }}
              onSelect={handleSelectFromCurrency}
              disabled={loading}
              renderRow={(option) => {
                return (
                  <ThemedView key={option} lightColor="#e5e7eb" darkColor="#262626" style={{ flexDirection: "row", alignItems: "center", padding: 10, gap: 10 }}>
                    <CircleFlag code={option} width="w-6" height="h-6" />
                    <ThemedText>{option}</ThemedText>
                  </ThemedView>
                );
              }}
            >
              <View key={fromCurrency.code} className="flex-row items-center gap-2">
                <CircleFlag
                  code={fromCurrency.code}
                  width="w-10"
                  height="h-10"
                />
                <ThemedText type="defaultSemiBold">
                  {fromCurrency.code}
                </ThemedText>
              </View>
            </ModalDropdown>
          </ThemedView>
          <ThemedText style={{ fontSize: 14, lineHeight: 20 }} lightColor="#737373" darkColor="#e5e7eb">
            You have <Text className="font-bold underline ">{fromCurrency.code} 100.00</Text> in your balance
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
            <ThemedText lightColor="#262626" darkColor="#e5e7eb">4.01</ThemedText>
          </View>
          <ThemedText lightColor="#262626" darkColor="#e5e7eb">Exchange Rate</ThemedText>
        </View>
        <View>
          <ThemedText style={{ fontSize: 14, lineHeight: 20 }} lightColor="#737373" darkColor="#e5e7eb">
            To your USD balance
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
            <ModalDropdown
              options={currencies.map((currency) => currency.code)}
              dropdownStyle={{ width: 120, height: 300 }}
              dropdownTextStyle={{ fontSize: 16, padding: 8 }}
              textStyle={{ color: "#000", fontSize: 18 }}
              onSelect={handleSelectToCurrency}
              disabled={loading}
              renderRow={(option) => {
                return (
                  <ThemedView key={option} lightColor="#e5e7eb" darkColor="#262626" style={{ flexDirection: "row", alignItems: "center", padding: 10, gap: 10 }}>
                    <CircleFlag code={option} width="w-6" height="h-6" />
                    <ThemedText>{option}</ThemedText>
                  </ThemedView>
                );
              }}
            >
              <View key={toCurrency.code} className="flex-row items-center gap-2">
                <CircleFlag
                  code={toCurrency.code}
                  width="w-10"
                  height="h-10"
                />
                <ThemedText type="defaultSemiBold">
                  {toCurrency.code}
                </ThemedText>
              </View>
            </ModalDropdown>
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
