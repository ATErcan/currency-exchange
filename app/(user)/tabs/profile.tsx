import { useEffect, useMemo } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useAuth } from "@/components/context/auth/AuthContext";
import { UpdateProfileFormValidation } from "@/utils/validation";
import { updateProfile } from "@/tools/api";
import Toast from "react-native-toast-message";
import Avatar from "@/components/ui/Avatar";
import { formatDate } from "@/utils/formatData";

export default function ProfileScreen() {
  const { logout, user, setUser } = useAuth();

  const bottom = useBottomTabOverflow();

  const formattedDate = useMemo(() => user ? formatDate(user?.data.createdAt) : "...", [user])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof UpdateProfileFormValidation>>({
    resolver: zodResolver(UpdateProfileFormValidation),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if(user) {
      setValue('name', user.data.name);
    }
  }, [user])

  const onSubmit = async (data: z.infer<typeof UpdateProfileFormValidation>) => {
    const res = await updateProfile(data.name);
    if(res.error) {
      const { data } = res.error;
      Toast.show({
        type: "error",
        text1: data.message
      });
    } else if(res.success) {
      setUser(res.success.res.data);
      setValue("name", res.success.res.data.data.name);
      Toast.show({
        type: "success",
        text1: "Profile updated successfullly!"
      })
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong!"
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ThemedScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: bottom, flexGrow: 1 }}
        >
          <View className="flex-row justify-between items-center">
            <ThemedText type="title" className="mb-2">
              Profile
            </ThemedText>
            <TouchableOpacity onPress={logout}>
              <MaterialIcons name="logout" size={24} color="#a3a3a3" />
            </TouchableOpacity>
          </View>
          <View className="py-10 items-center gap-3">
            <Avatar
              name={user?.data.name}
              width="w-24"
              height="h-24"
              textType="title"
            />
            <ThemedText className="text-gray-700 mb-2">
              Joined At: {formattedDate}
            </ThemedText>
          </View>
          <View>
            {/* Full Name */}
            <View className="mb-4 w-full">
              <ThemedText className="text-gray-700 mb-2">
                Full Name
              </ThemedText>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="p-3 border border-gray-300 rounded bg-white"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your full name"
                  />
                )}
              />
              {errors.name && (
                <Text className="text-red-500 mt-1">
                  {errors.name.message}
                </Text>
              )}
            </View>

            {/* Email */}
            <View className="mb-4 w-full">
              <Text className="text-gray-700 mb-2">Email</Text>
              <TextInput
                className="p-3 border border-gray-300 rounded bg-white opacity-40"
                keyboardType="email-address"
                editable={false}
                value={user ? user.data.email : ""}
              />
            </View>
          </View>
          <TouchableOpacity
            className="bg-blue-500 px-12 py-4 rounded-2xl mt-auto mb-4"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-center text-white font-bold">
              Update Profile
            </Text>
          </TouchableOpacity>
        </ThemedScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}