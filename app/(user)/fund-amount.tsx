import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CircleFlag from "@/components/currency/CircleFlag";
import { Controller, useForm } from "react-hook-form";
import { FundAmountValidation } from "@/utils/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatNumber } from "@/utils/formatDecimalSeperator";

export default function FundAmountScreen() {
  const { baseCurrency } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof FundAmountValidation>>({
    resolver: zodResolver(FundAmountValidation),
    defaultValues: {
      amount: "",
    },
  });

  const handleChange = (value: string) => {
    const formattedValue = formatNumber(value);
    setValue("amount", formattedValue, { shouldValidate: true });
  };

  const onSubmit = (data: z.infer<typeof FundAmountValidation>) => {
    router.push({
      pathname: "/(user)/add-funds",
      params: { amount: data.amount }
    })
  };

  return (
    <ThemedScrollView
      className="px-4 py-6"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View className="gap-2">
        <ThemedText type="title" className="mb-2">Add Funds</ThemedText>
        <ThemedText>Amount to be added to account</ThemedText>
        <ThemedView
          className="w-full h-16 flex-row items-center justify-between gap-2 pr-4 border border-gray-300 rounded-2xl"
          lightColor="#e5e7eb"
          darkColor="#262626"
        >
          <Controller
            control={control}
            name="amount"
            render={({ field: { value } }) => (
              <TextInput
                keyboardType="numeric"
                value={value}
                onChangeText={(text) => handleChange(text)}
                className="flex-1 h-full p-2 text-3xl text-gray-300"
                placeholder="0,00"
              />
            )}
          />
          <View className="flex-row items-center gap-1">
            <CircleFlag
              code={typeof baseCurrency === "string" ? baseCurrency : baseCurrency[0]}
              width="w-10"
              height="h-10"
            />
            <ThemedText type="defaultSemiBold">{baseCurrency}</ThemedText>
          </View>
        </ThemedView>
        {errors.amount && (
          <Text className="text-red-500">{errors.amount.message}</Text>
        )}
      </View>
      <TouchableOpacity
        className="bg-blue-500 px-12 py-4 rounded-2xl mb-8"
        onPress={handleSubmit(onSubmit)}
      >
        <ThemedText className="text-center text-white font-bold">
          Continue
        </ThemedText>
      </TouchableOpacity>
    </ThemedScrollView>
  );
}