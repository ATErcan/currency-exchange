import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

import { RatesTable, Tables } from "@/lib/types/rates.type";
import { getAllCurrenciesByTable } from "@/tools/api";
import CurrencyItem from "./CurrencyItem";

export default function CurrencyList({ table }: { table: Tables }) {
  const [currencies, setCurrencies] = useState<RatesTable>();

  async function getCurrencies(table: string) {
    try {
      const data: RatesTable = await getAllCurrenciesByTable(table)
      setCurrencies(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to fetch currency rates",
      });
    }
  }

  useEffect(() => {
    getCurrencies(table);
  }, [table])
  return (
    <View className="gap-4 flex-row flex-wrap justify-center">
      {currencies && currencies.rates.map(currency => (
        <CurrencyItem key={currency.currency} code={currency.code} table={table} />
      ))}
    </View>
  )
}