import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';

import CircleFlag from "@/components/currency/CircleFlag";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ExchangeScreen() {
  const [fromCurrency, setFromCurrency] = useState({
    code: "PLN",
    country: "pl",
  });

  const currencies = [
    { code: "PLN", country: "pl" },
    { code: "USD", country: "us" },
    { code: "EUR", country: "eu" },
    { code: "JPY", country: "jp" },
    { code: "GBP", country: "gb" },
  ];

  const handleSelectCurrency = (index: string) => {
    setFromCurrency(currencies[+index]);
  };

  return (
    <ThemedScrollView
      className="px-4 py-6"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View className="gap-2">
        <ThemedText type="title" className="mb-2">
          Exchange
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
          />
          <ModalDropdown
            options={currencies.map((currency) => currency.code)}
            dropdownStyle={{ width: 120, height: "auto" }}
            dropdownTextStyle={{ fontSize: 16, padding: 8 }}
            textStyle={{ color: "#000", fontSize: 18 }}
            onSelect={handleSelectCurrency}
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
      </View>
      <TouchableOpacity className="bg-blue-500 px-12 py-4 rounded-2xl mb-8">
        <ThemedText className="text-center font-bold" lightColor="#e5e7eb">
          Exchange
        </ThemedText>
      </TouchableOpacity>
    </ThemedScrollView>
  );
}
