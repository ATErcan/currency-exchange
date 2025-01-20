import { View } from "react-native";
import { Link } from "expo-router";

import { ThemedIconSymbol } from "@/components/ThemedIconSymbol";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TransactionSuccessScreen() {
  return (
    <ThemedScrollView className="p-4" contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView lightColor="#f3f4f6" className="justify-center items-center py-20 gap-3">
        <ThemedView
          className="w-20 h-20 rounded-full items-center justify-center overflow-hidden"
          lightColor="#e5e7eb"
        >
          <ThemedIconSymbol size={36} name="checkmark" weight="medium" lightColor="#16a34a" darkColor="#e5e7eb" />
        </ThemedView>
        <ThemedText type="title" style={{ lineHeight: 40 }} lightColor="#262626" darkColor="#e5e7eb">+ 10.000 PLN</ThemedText>
        <View className="flex-row items-center gap-2 border border-gray-200 pl-1 py-1 pr-3 rounded-3xl">
          <ThemedView
            className="w-7 h-7 rounded-full items-center justify-center overflow-hidden"
            lightColor="#e5e7eb"
          >
            <ThemedIconSymbol size={18} name="plus" lightColor="#262626" darkColor="#e5e7eb" />
          </ThemedView>
          <ThemedText lightColor="#262626" darkColor="#e5e7eb">Funds added</ThemedText>
        </View>
      </ThemedView>
      <View className="py-5 gap-5">
        <ThemedText type="title" style={{ lineHeight: 40 }} lightColor="#262626" darkColor="#e5e7eb">Transaction Details</ThemedText>
        <View className="border-dashed border border-gray-200"></View>
        <View className="flex-row justify-between">
          <ThemedText lightColor="#404040" darkColor="#e5e7eb">Added</ThemedText>
          <ThemedText lightColor="#404040" darkColor="#e5e7eb">10.000 PLN</ThemedText>
        </View>
        <View className="border-dashed border border-gray-200"></View>
        <View className="flex-row justify-between">
          <ThemedText lightColor="#404040" darkColor="#e5e7eb">Transaction Date</ThemedText>
          <ThemedText lightColor="#404040" darkColor="#e5e7eb">20 Jan 2025</ThemedText>
        </View>
        <View className="flex-row justify-between">
          <ThemedText lightColor="#404040" darkColor="#e5e7eb">Transaction Number</ThemedText>
          <ThemedText lightColor="#404040" darkColor="#e5e7eb">#87218712382</ThemedText>
        </View>
      </View>
      <Link
        href="/(user)/tabs/home"
        className="bg-blue-500 px-12 py-4 rounded-2xl mb-2 mt-auto"
      >
        <ThemedText className="text-center font-bold" lightColor="#e5e7eb">
          Home
        </ThemedText>
      </Link>
    </ThemedScrollView>
  )
}