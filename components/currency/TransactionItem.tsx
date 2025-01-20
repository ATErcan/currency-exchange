import { View } from "react-native";

import { ThemedView } from "../ThemedView";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedText } from "../ThemedText";
import { ITransactionItemProps } from "@/lib/types/props.types";
import { formatAmount, roundToPrecision } from "@/utils/formatDecimalSeperator";
import { formatDate } from "@/utils/formatData";
import { ThemedIconSymbol } from "../ThemedIconSymbol";

export default function TransactionItem({ transaction, baseCurrency }: ITransactionItemProps) {

  if(transaction.type === "fund") {
    return (
      <View className="flex-row items-center gap-4">
        <ThemedView lightColor="#e5e7eb" darkColor="#262626" className="w-16 h-16 rounded-full items-center justify-center">
          <ThemedIconSymbol size={24} name="arrow.down" lightColor="#000" darkColor="#e5e7eb" />
        </ThemedView>
        <View className="flex-1 flex-col gap-0">
          <View className="flex-row justify-between m-0">
            <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>To {baseCurrency} balance</ThemedText>
            <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>
              {`+ ${formatAmount(roundToPrecision(transaction.amount))} ${baseCurrency}`}
            </ThemedText>
          </View>
          <View className="flex-row justify-between m-0">
            <ThemedText style={{ fontSize: 13 }}>{formatDate(transaction.createdAt)}</ThemedText>
          </View>
        </View>
      </View>
    )
  }

  if(transaction.type === "exchange") {
    return (
      <View className="flex-row items-center gap-4">
        <ThemedView lightColor="#e5e7eb" darkColor="#262626" className="w-16 h-16 rounded-full items-center justify-center">
          <ThemedIconSymbol size={24} name="arrow.left.and.right" lightColor="#000" darkColor="#e5e7eb" />
        </ThemedView>
        <View className="flex-1 flex-col gap-0">
          <View className="flex-row justify-between m-0">
            <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>To {transaction.to.code} balance</ThemedText>
            <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>
              {`${formatAmount(roundToPrecision(transaction.to.amount))} ${transaction.to.code}`}
            </ThemedText>
          </View>
          <View className="flex-row justify-between m-0">
            <ThemedText style={{ fontSize: 13 }}>{formatDate(transaction.createdAt)}</ThemedText>
            <ThemedText style={{ fontSize: 13 }}>
              {`${formatAmount(roundToPrecision(transaction.from.amount))} ${transaction.from.code}`}
            </ThemedText>
          </View>
        </View>
      </View>
    );
  }
}