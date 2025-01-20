import { Link } from "expo-router";


import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { ThemedIconSymbol } from "@/components/ThemedIconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { ThemedScrollView } from "@/components/ThemedScrollView";

export default function TransactionsScreen() {
  const bottom = useBottomTabOverflow();
  return (
    <ThemedScrollView
      className="p-4"
      contentContainerStyle={{ paddingBottom: bottom, flexGrow: 1 }}
    >
      <View className={`flex-1 justify-center items-center`}>
        <View className="gap-4">
          <ThemedView className="gap-2 mb-1 rounded-2xl self-start px-1" lightColor="#e5e7eb" darkColor="#262626">
            <Link href="/fund-amount">
              <View className="flex-row items-center py-3 px-5">
                <ThemedIconSymbol size={20} name="plus" lightColor="#262626" darkColor="#e5e7eb" />
                <ThemedText className="ml-2" type="subtitle" style={{ fontWeight: 500 }} lightColor="#262626" darkColor="#e5e7eb">
                  Add Funds
                </ThemedText>
              </View>
            </Link>
          </ThemedView>
          <ThemedView className="gap-2 mb-1 rounded-2xl self-start px-2" lightColor="#e5e7eb" darkColor="#262626">
            {/* TODO: Change to exchange when created */}
            <Link href="/exchange">
              <View className="flex-row items-center py-3 px-5">
                <ThemedIconSymbol size={20} name="arrow.left.and.right" lightColor="#262626" darkColor="#e5e7eb" />
                <ThemedText className="ml-2" type="subtitle" style={{ fontWeight: 500 }}  lightColor="#262626" darkColor="#e5e7eb">
                  Exchange
                </ThemedText>
              </View>
            </Link>
          </ThemedView>
        </View>
      </View>
    </ThemedScrollView>
  )
}