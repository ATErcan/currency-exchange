import { useCallback, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import Transactions from "@/components/currency/Transactions";
import { BASE_CURRENCY } from "@/constants/api";

export default function TransactionHistory() {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<boolean>(false);

  const bottom = useBottomTabOverflow();

  const fetchOlderTransactions = useCallback(() => setPage(prev => prev + 1), []);

  return (
    <ThemedScrollView className="px-4 py-6" contentContainerStyle={{ paddingBottom: bottom }}>
      <Transactions baseCurrency={BASE_CURRENCY} isSummary={false} page={page} setMaxPage={setMaxPage} />
      {!maxPage && (
        <TouchableOpacity
          className="bg-gray-200 self-center mb-4 px-12 py-3 rounded-2xl"
          onPress={fetchOlderTransactions}
        >
          <Text className="text-center text-neutral-800 font-bold">Older</Text>
        </TouchableOpacity>
      )}
    </ThemedScrollView>
  );
}