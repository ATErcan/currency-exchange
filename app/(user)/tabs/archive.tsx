import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import CurrencyList from "@/components/currency/CurrencyList";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { tableA, tableB } from "@/constants/utilsConstants";
import { Tables } from "@/lib/types/rates.type";

export default function ArchiveScreen() {
  const [table, setTable] = useState<Tables>("a");

  const handleTableChange = useCallback((table: Tables) => setTable(table), []);

  const bottom = useBottomTabOverflow();
  return (
    <ThemedScrollView
      className="px-4 py-6"
      contentContainerStyle={{ paddingBottom: bottom }}
    >
      <ThemedText type="title" className="mb-4">
        Archived Rates
      </ThemedText>
      <View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="flex-1 bg-blue-500 px-12 py-4 rounded-2xl mb-4"
            onPress={() => handleTableChange(tableA)}
          >
            <Text className="text-center text-white font-bold">Table A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-blue-500 px-12 py-4 rounded-2xl mb-4"
            onPress={() => handleTableChange(tableB)}
          >
            <Text className="text-center text-white font-bold">Table B</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CurrencyList table={table} />
    </ThemedScrollView>
  );
}