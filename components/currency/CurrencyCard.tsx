import { View } from "react-native";
import { Link } from "expo-router";
import { getAllISOByCurrencyOrSymbol } from "iso-country-currency";
import CountryFlag from "react-native-country-flag";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { ICurrencyCardProps } from "@/lib/types/props.types";
import { formatAmount, roundToPrecision } from "@/utils/formatDecimalSeperator";

export default function CurrencyCard({ code, amount, loading }: ICurrencyCardProps) {
  const country = getAllISOByCurrencyOrSymbol('currency', code);
  const formattedAmount = formatAmount(roundToPrecision(amount));
  // TODO: fix multiple countries using the same currency
  return (
    <ThemedView className="rounded-xl w-52 h-52 flex flex-col justify-between" lightColor="#e5e7eb" darkColor="#262626">
      {/* TODO: Change to currency page when created */}
      <Link href="/explore" className="h-full w-full p-5">
        <View className="h-full w-full flex flex-col justify-between">
          <View className="flex-row items-center gap-4">
            <ThemedView className="w-14 h-14 rounded-full items-center justify-center overflow-hidden" lightColor="#111827">
              {!loading && <CountryFlag isoCode={country[0]} size={36} style={{ width: "100%", height: "100%" }} />}
            </ThemedView>
            <ThemedText type="defaultSemiBold" lightColor="#111827">{loading ? "***" : code}</ThemedText>
          </View>
          <View>
            <ThemedText type="title" lightColor="#000">{loading ? "***" : formattedAmount}</ThemedText>
          </View>
        </View>
      </Link>
    </ThemedView>
  );
}