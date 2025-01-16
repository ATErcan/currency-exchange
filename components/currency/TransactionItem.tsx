import { View } from "react-native";

import { ThemedView } from "../ThemedView";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedText } from "../ThemedText";

export default function TransactionItem() {
  return (
    <View className="flex-row items-center gap-4">
      <ThemedView lightColor="#e5e7eb" className="w-16 h-16 rounded-full items-center justify-center">
        <IconSymbol size={24} name="arrow.left.and.right" color="black" />
      </ThemedView>
      <View className="flex-1 flex-col gap-0">
        <View className="flex-row justify-between m-0">
          <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>To TRY balance</ThemedText>
          <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>12,00 TRY</ThemedText>
        </View>
        <View className="flex-row justify-between m-0">
          <ThemedText style={{ fontSize: 13 }}>8 Jul 2024</ThemedText>
          <ThemedText style={{ fontSize: 13 }}>100,00 PLN</ThemedText>
        </View>
      </View>
    </View>
  );
}