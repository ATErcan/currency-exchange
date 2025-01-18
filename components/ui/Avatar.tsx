import { Text, View } from "react-native";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function Avatar({ name }: { name: string | undefined }) {
  const firstLetter = name?.charAt(0).toUpperCase();
  
  return (
    <ThemedView
      className="w-8 h-8 rounded-full justify-center items-center ml-2.5"
      lightColor="#e5e7eb"
      darkColor="#262626"
    >
      <ThemedText
        type="subtitle"
        lightColor="#000"
        darkColor="#f9fafb"
      >
        {firstLetter}
      </ThemedText>
    </ThemedView>
  );
}