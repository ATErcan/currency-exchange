import { View } from "react-native";
import { Link } from "expo-router";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import CircleFlag from "./CircleFlag";
import { ICurrencyItemProps } from "@/lib/types/props.types";

export default function CurrencyItem({ code, table }: ICurrencyItemProps) {
  return (
    <ThemedView lightColor="#e5e7eb" darkColor="#262626" className="rounded-3xl">
      <Link
        className="rounded-3xl"
        href={{
          pathname: "/generate-graph",
          params: { table, code },
        }}
      >
        <View className="flex flex-row items-center gap-4 px-3 py-2 rounded-3xl">
          <CircleFlag code={code} width="w-12" height="h-12" />
          <ThemedText lightColor="#262626" darkColor="#e5e7eb">
            {code}
          </ThemedText>
        </View>
      </Link>
    </ThemedView>
  );
}