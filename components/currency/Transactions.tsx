import { View } from "react-native";
import { Link } from "expo-router";

import { ThemedText } from "../ThemedText";
import TransactionItem from "./TransactionItem";

export default function Transactions() {
  return (
    <View className="gap-4">
      <View className="flex-row justify-between">
        <ThemedText type="title">Transactions</ThemedText>
        {/* TODO: change to transactions when created */}
        <ThemedText lightColor="#111827" className="underline">
          <Link href="/explore">See All</Link>
        </ThemedText>
      </View>
      <View className="gap-4">
        {Array.from({ length: 3 }).map(_ => (
          <TransactionItem />
        ))}
      </View>
    </View>
  );
}
