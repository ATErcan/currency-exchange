import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
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
                <TextInput
                  className="p-3 border border-gray-300 rounded bg-white"
                  placeholder="Enter your full name"
                />
              </View>

              {/* Email */}
              <View className="mb-4 w-full">
                <Text className="text-gray-700 mb-2">Email</Text>
                <TextInput
                  className="p-3 border border-gray-300 rounded bg-white"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>

              {/* Password */}
              <View className="mb-4 w-full">
                <Text className="text-gray-700 mb-2">Password</Text>
                <TextInput
                  className="p-3 border border-gray-300 rounded bg-white"
                  placeholder="Enter your password"
                  secureTextEntry
                />
              </View>

              {/* Confirm Password */}
              <View className="mb-6 w-full">
                <Text className="text-gray-700 mb-2">Confirm Password</Text>
                <TextInput
                  className="p-3 border border-gray-300 rounded bg-white"
                  placeholder="Confirm your password"
                  secureTextEntry
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                className="bg-blue-500 px-12 py-4 rounded-2xl"
                // onPress={handleSubmit(onSubmit)}
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