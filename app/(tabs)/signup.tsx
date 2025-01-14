import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { SignUpFormValidation } from "@/utils/validation";
import { signUp } from "@/tools/api";
import Toast from "react-native-toast-message";
import { saveToSecureStore } from "@/utils/expo-secure-store";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpFormValidation>) => {
    const res = await signUp(data);
    if(res.error) {
      const { data } = res.error;
      Toast.show({
        type: "error",
        text1:
          typeof data.message === "string"
            ? data.message
            : data.message.email || data.message.name || data.message.password,
      });
    } else if(res.success) {
      await saveToSecureStore("user_me", res.success.res.data.jwt.token);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 pb-14">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={10}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View className="flex-1 justify-center items-center w-4/5 max-w-md">
              <Text className="text-2xl font-bold text-center text-blue-500 mb-6">
                Sign Up
              </Text>

              {/* Full Name */}
              <View className="mb-4 w-full">
                <Text className="text-gray-700 mb-2">Full Name</Text>
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
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="p-3 border border-gray-300 rounded bg-white"
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.email && (
                  <Text className="text-red-500 mt-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              {/* Password */}
              <View className="mb-4 w-full">
                <Text className="text-gray-700 mb-2">Password</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="p-3 border border-gray-300 rounded bg-white"
                      placeholder="Enter your password"
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      onEndEditing={(event) => {
                        if (event.nativeEvent.text.length === 0) {
                          onChange("");
                        }
                      }}
                    />
                  )}
                />
                {errors.password && (
                  <Text className="text-red-500 mt-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              {/* Confirm Password */}
              <View className="mb-6 w-full">
                <Text className="text-gray-700 mb-2">Confirm Password</Text>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="p-3 border border-gray-300 rounded bg-white"
                      placeholder="Confirm your password"
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      onEndEditing={(event) => {
                        if (event.nativeEvent.text.length === 0) {
                          onChange("");
                        }
                      }}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text className="text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                className="bg-blue-500 px-12 py-4 rounded-2xl"
                onPress={handleSubmit(onSubmit)}
              >
                <Text className="text-center text-white font-bold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}