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

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";

const toStatusIcon = (status?: ValidationState) =>
  status === "valid" ? "✅" : status === "invalid" ? "❌" : "❓";


export default function AddFundsScreen() {
  const [useLiteInput, setUseLiteInput] = useState(false);
  const [focusedField, setFocusedField] = useState<CreditCardFormField>();
  const [formData, setFormData] = useState<CreditCardFormData>();

  const handleSubmit = () => {
    if(formData?.valid) {
      console.log("submit")
    } else {
      console.log("don't submit")
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
          <TouchableOpacity className="bg-blue-500 px-12 py-4 rounded-2xl" onPress={handleSubmit}>
            <Text className="text-center text-white font-bold">Add Funds</Text>
          </TouchableOpacity>
        </ThemedScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}