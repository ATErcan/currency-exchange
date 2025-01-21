import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useAuth } from "@/components/context/auth/AuthContext";

export default function ProfileScreen() {
  const { logout } = useAuth();

  const bottom = useBottomTabOverflow();
  return (
    <ThemedScrollView className="p-4" contentContainerStyle={{ paddingBottom: bottom }}>
      <View className="flex-row justify-between items-center">
        <ThemedText type="title" className="mb-2">Profile</ThemedText>
        <TouchableOpacity onPress={logout}>
          <MaterialIcons name="logout" size={24} color="#a3a3a3" />
        </TouchableOpacity>
      </View>
    </ThemedScrollView>
  )
}