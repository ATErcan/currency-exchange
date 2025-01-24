import { Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { GraphFormData, Tables } from "@/lib/types/rates.type";
import { GraphRangeValidation } from "@/utils/validation";

export default function GenerateGraphScreen() {
  const { table, code }: { code: string; table: Tables } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof GraphRangeValidation>>({
    resolver: zodResolver(GraphRangeValidation),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof GraphRangeValidation>) => {
    const startDate = data.startDate.toISOString().split('T')[0];
    const endDate = data.endDate.toISOString().split('T')[0];

    const formData: GraphFormData = {
      startDate,
      endDate,
      code,
      table
    };

    router.push({
      pathname: "/rate-graph",
      params: { data: JSON.stringify(formData) }
    })
  };

  return (
    <ThemedScrollView
      className="px-4 py-6"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ThemedText type="title" className="mb-8">
        Get Archived Rates
      </ThemedText>
      <View className="flex-1 flex-row justify-evenly items-center mb-6">
        <View className="gap-2">
          <ThemedText type="subtitle" className="ml-3">
            Start Date
          </ThemedText>
          <Controller
            control={control}
            name="startDate"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                value={value}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  onChange(selectedDate);
                }}
                maximumDate={new Date()}
              />
            )}
          />
          {errors.startDate && (
            <Text className="text-red-500 mt-1">
              {errors.startDate.message}
            </Text>
          )}
        </View>

        <View className="gap-2">
          <ThemedText type="subtitle" className="ml-3">
            End Date
          </ThemedText>
          <Controller
            control={control}
            name="endDate"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                value={value}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  onChange(selectedDate);
                }}
                maximumDate={new Date()}
              />
            )}
          />
          {errors.endDate && (
            <Text className="text-red-500 mt-1">{errors.endDate.message}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        className="bg-blue-500 px-12 py-4 rounded-2xl mt-auto mb-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-white font-bold">Get Rate Graph</Text>
      </TouchableOpacity>
    </ThemedScrollView>
  );
}