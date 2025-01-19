import { useState } from "react";
import { TextInput, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CircleFlag from "@/components/currency/CircleFlag";

export default function FundAmountScreen() {
  const [amount, setAmount] = useState<string>("");

  const { baseCurrency } = useLocalSearchParams();

  const handleChange = (num: string) => {
    setAmount(num);
  }

  return (
    <ThemedScrollView
      className="px-4 py-6"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View className="gap-2">
        <ThemedText type="title" className="mb-2">Add Funds</ThemedText>
        <ThemedText>Amount to be added to account</ThemedText>
        <ThemedView
          className="w-full h-16 flex-row items-center justify-between gap-2 pr-4 border border-gray-300 rounded-2xl"
          lightColor="#e5e7eb"
          darkColor="#262626"
        >
          <TextInput
            keyboardType="numeric"
            value={amount}
            onChangeText={handleChange}
            className="flex-1 h-full p-2 text-3xl text-gray-300"
          />
          <View className="flex-row items-center gap-1">
            <CircleFlag
              code={typeof baseCurrency === "string" ? baseCurrency : baseCurrency[0]}
              width="w-10"
              height="h-10"
            />
            <ThemedText type="defaultSemiBold">{baseCurrency}</ThemedText>
          </View>
        </ThemedView>
      </View>
      <Link
        href="/(user)/add-funds"
        className="bg-blue-500 px-12 py-4 rounded-2xl mb-8"
      >
        <ThemedText className="text-center text-white font-bold">
          Continue
        </ThemedText>
      </Link>
    </ThemedScrollView>
  );
}