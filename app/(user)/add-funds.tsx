import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import {
  CreditCardInput,
  CreditCardView,
  CreditCardFormData,
  CreditCardFormField,
  LiteCreditCardInput,
  ValidationState,
} from "react-native-credit-card-input";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { addFunds } from "@/tools/api";
import { useTheme } from "@react-navigation/native";

const toStatusIcon = (status?: ValidationState) =>
  status === "valid" ? "✅" : status === "invalid" ? "❌" : "❓";


export default function AddFundsScreen() {
  const [useLiteInput, setUseLiteInput] = useState(false);
  const [focusedField, setFocusedField] = useState<CreditCardFormField>();
  const [formData, setFormData] = useState<CreditCardFormData>();

  const { amount }: { amount: string } = useLocalSearchParams();

  const { dark } = useTheme();

  async function addToBalance(amount: number) {
    try {
      const { success, error } = await addFunds(amount);
      if(error) {
        Toast.show({
          type: "error",
          text1: error.data.message
        });
        if(error.status === 400) return router.navigate("/(user)/fund-amount");
      } else if(success) {
        const data = success?.res.data.data;
        router.navigate({
          pathname: "/(user)/transaction-success",
          params: { data: JSON.stringify(data) }
        })
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong, try again later.",
      });
    }
  }

  const handleSubmit = () => {
    if(formData?.valid) {
      const amountToNumber = amount.split(".").join("").replace(",", ".");
      if (amountToNumber && !isNaN(Number(amountToNumber))) {
        addToBalance(Number(amountToNumber));
      } else {
        Toast.show({
          type: "error",
          text1: `Invalid fund amount: ${amount}`,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid payment information",
      });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <ThemedScrollView className="px-4 py-6">
          <ThemedText type="title">Add Funds</ThemedText>
          <CreditCardView
            focusedField={focusedField}
            number={formData?.values.number}
            expiry={formData?.values.expiry}
            cvc={formData?.values.cvc}
            style={{ marginVertical: 12 }}
          />

          {useLiteInput ? (
            <LiteCreditCardInput
              autoFocus
              onChange={setFormData}
              onFocusField={setFocusedField}
            />
          ) : (
            <CreditCardInput
              autoFocus
              onChange={setFormData}
              onFocusField={setFocusedField}
              inputStyle={{ color: dark ? "#d1d5db" : "#262626" }}
            />
          )}

          <View className="m-5 p-5 bg-slate-50 rounded-md">
            <Text
              style={{
                fontFamily: Platform.select({
                  ios: "Courier",
                  android: "monospace",
                  web: "monospace",
                }),
              }}
            >
              {formData?.valid
                ? "✅ Possibly valid card"
                : "❌ Invalid/Incomplete card"}
            </Text>

            <Text
              style={{
                fontFamily: Platform.select({
                  ios: "Courier",
                  android: "monospace",
                  web: "monospace",
                }),
              }}
            >
              {toStatusIcon(formData?.status.number)}
              {" Number\t: "}
              {formData?.values.number}
            </Text>

            <Text
              style={{
                fontFamily: Platform.select({
                  ios: "Courier",
                  android: "monospace",
                  web: "monospace",
                }),
              }}
            >
              {toStatusIcon(formData?.status.expiry)}
              {" Expiry\t: "}
              {formData?.values.expiry}
            </Text>

            <Text
              style={{
                fontFamily: Platform.select({
                  ios: "Courier",
                  android: "monospace",
                  web: "monospace",
                }),
              }}
            >
              {toStatusIcon(formData?.status.cvc)}
              {" Cvc   \t: "}
              {formData?.values.cvc}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-blue-500 px-12 py-4 rounded-2xl"
            onPress={handleSubmit}
          >
            <Text className="text-center text-white font-bold">Add Funds</Text>
          </TouchableOpacity>
        </ThemedScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}