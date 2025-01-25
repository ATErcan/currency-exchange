import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";

import { ThemedText } from "../ThemedText";
import TransactionItem from "./TransactionItem";
import { Transaction } from "@/lib/types/currencies.type";
import { getAllTransactions } from "@/tools/api";
import { ITransactionsProps } from "@/lib/types/props.types";

function Transactions({ baseCurrency, page, setMaxPage, isSummary }: ITransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if(page) {
        fetchAllTransactions(page);
      } else {
        fetchAllTransactions(1);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong, try again later.",
      });
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  async function fetchAllTransactions(page: number) {
    const { success, error } = await getAllTransactions(page);
    if (error) {
      Toast.show({
        type: "error",
        text1: error.data.message,
      });
      setTransactions([]);
    } else if (success) {
      const { currentPage, totalPages, data } = success.res.data;
      if(currentPage === totalPages && setMaxPage) {
        setMaxPage(true)
      } else if(data.length === 0 && setMaxPage) {
        setMaxPage(true);
      }
      setTransactions((prevTransactions) => [...prevTransactions, ...data]);
    }
  }

  return (
    <View className="gap-4 mb-2">
      <View className="flex-row justify-between">
        <ThemedText type="title" className="mb-2">Transactions</ThemedText>
        {isSummary &&  transactions.length !== 0 &&(
          <ThemedText lightColor="#111827" className="underline">
            <Link href="/(user)/tabs/history">See All</Link>
          </ThemedText>
        )}
      </View>
      <View className="gap-4">
        {loading ? (
          <ThemedText type="title" lightColor="#111827" darkColor="#e5e7eb">Loading...</ThemedText>
        ) : (
          transactions.length === 0 ? (
            <ThemedText lightColor="#111827" darkColor="#e5e7eb" className="text-center mt-10">
              You haven't made any transactions yet
            </ThemedText>
          ) : (
            transactions.map((transaction) => (
              <TransactionItem key={transaction._id} transaction={transaction} baseCurrency={baseCurrency} />
            ))
        ))}
      </View>
    </View>
  );
}

export default React.memo(Transactions);