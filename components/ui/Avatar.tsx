import { Text, View } from "react-native";

export default function Avatar({ name }: { name: string | undefined }) {
  const firstLetter = name?.charAt(0).toUpperCase();
  
  return (
    <View className="w-8 h-8 rounded-full justify-center items-center ml-2.5 bg-gray-200">
      <Text className="text-black text-base font-bold">{firstLetter}</Text>
    </View>
  );
}