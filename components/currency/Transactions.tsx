import { useEffect, useState } from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";

import { ThemedText } from "../ThemedText";
import TransactionItem from "./TransactionItem";
import { Transaction } from "@/lib/types/currencies.type";
import { getAllTransactions } from "@/tools/api";
import { ITransactionsProps } from "@/lib/types/props.types";

export default function Transactions({ baseCurrency }: ITransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      fetchAllTransactions();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong, try again later.",
      });
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  async function fetchAllTransactions() {
    const { success, error } = await getAllTransactions();
    if (error) {
      Toast.show({
        type: "error",
        text1: error.data.message,
      });
      setTransactions([]);
    } else if (success) {
      const data = success.res.data.data;
      setTransactions(data);
    }
  }

  return (
    <View className="gap-4 mb-2">
      <View className="flex-row justify-between">
        <ThemedText type="title">Transactions</ThemedText>
        {/* TODO: change to transactions when created */}
        <ThemedText lightColor="#111827" className="underline">
          <Link href="/explore">See All</Link>
        </ThemedText>
      </View>
      <View className="gap-4">
        {/* TODO: create a proper loading UI */}
        {loading ? (
          <ThemedText type="title">Loading...</ThemedText>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem key={transaction._id} transaction={transaction} baseCurrency={baseCurrency} />
          ))
        )}
      </View>
    </View>
  );
}
