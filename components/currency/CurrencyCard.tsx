import { View } from "react-native";
import { Link } from "expo-router";
import { getAllISOByCurrencyOrSymbol } from "iso-country-currency";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { ICurrencyCardProps } from "@/lib/types/props.types";
import { formatAmount, roundToPrecision } from "@/utils/formatDecimalSeperator";
import CircleFlag from "./CircleFlag";

export default function CurrencyCard({ code, amount, loading }: ICurrencyCardProps) {
  const country = getAllISOByCurrencyOrSymbol('currency', code);
  const formattedAmount = formatAmount(roundToPrecision(amount));
  // TODO: fix multiple countries using the same currency
  return (
    <ThemedView className="rounded-xl w-52 h-52 flex flex-col justify-between" lightColor="#e5e7eb" darkColor="#262626">
      {/* TODO: Change to currency page when created */}
      <Link
        href={{
          pathname: `/currency/[code]`,
          params: { code, currency: code, amount: formattedAmount, country: country[0] }
        }}
        className="h-full w-full p-5"
      >
        <View className="h-full w-full flex flex-col justify-between">
          <View className="flex-row items-center gap-4">
            <CircleFlag country={country[0]} loading={loading} />
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