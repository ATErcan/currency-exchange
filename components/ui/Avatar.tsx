import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { IAvatarProps } from "@/lib/types/props.types";

export default function Avatar({
  name,
  width = "w-8",
  height = "h-8",
  textType = "subtitle",
}: IAvatarProps) {
  const firstLetter = name?.charAt(0).toUpperCase();

  return (
    <ThemedView
      className={`${width} ${height} rounded-full justify-center items-center ml-2.5`}
      lightColor="#e5e7eb"
      darkColor="#262626"
    >
      <ThemedText type={textType} lightColor="#000" darkColor="#f9fafb">
        {firstLetter}
      </ThemedText>
    </ThemedView>
  );
}