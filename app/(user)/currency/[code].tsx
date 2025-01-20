import { Link, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import CircleFlag from "@/components/currency/CircleFlag";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedIconSymbol } from "@/components/ThemedIconSymbol";

export default function CurrencyScreen() {
  const { code, currency, amount, country } = useLocalSearchParams();

  return (
    <ThemedScrollView className="p-4" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center items-center gap-10">
        <View className="gap-2 items-center">
          <View className="flex-row gap-4 items-center">
            <CircleFlag code={typeof code === "string" ? code : code[0]} />
            <ThemedText style={{ fontSize: 16 }}>{currency} Balance</ThemedText>
          </View>
          <ThemedText style={{ fontSize: 48, lineHeight: 48, fontWeight: 500 }}>
            {amount} {currency}
          </ThemedText>
        </View>

        <View className="flex-row gap-8">
          <View className="items-center">
            <Link
              href={{
                pathname:
                  code === "PLN"
                    ? "/(user)/fund-amount"
                    : "/(user)/tabs/explore",
                params: { baseCurrency: code === "PLN" ? "PLN" : "" },
              }}
            >
              <ThemedView
                className="w-14 h-14 rounded-full items-center justify-center overflow-hidden"
                lightColor="#e5e7eb"
                darkColor="#262626"
              >
                <ThemedIconSymbol
                  size={24}
                  name="plus"
                  lightColor="#262626"
                  darkColor="#e5e7eb"
                />
              </ThemedView>
            </Link>
            <ThemedText style={{ fontSize: 14 }}>Add</ThemedText>
          </View>

          <View className="items-center">
            <Link href="/(user)/tabs/explore">
              <ThemedView
                className="w-14 h-14 rounded-full items-center justify-center overflow-hidden"
                lightColor="#e5e7eb"
                darkColor="#262626"
              >
                <ThemedIconSymbol
                  size={24}
                  name="arrow.left.and.right"
                  lightColor="#262626"
                  darkColor="#e5e7eb"
                />
              </ThemedView>
            </Link>
            <ThemedText style={{ fontSize: 14 }}>Exchange</ThemedText>
          </View>
        </View>
      </View>
    </ThemedScrollView>
  );
}