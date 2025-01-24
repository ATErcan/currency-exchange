import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LineChart } from "react-native-chart-kit";
import Toast from "react-native-toast-message";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { GraphFormData } from "@/lib/types/rates.type";
import { getArchivedRatesOfCurrency } from "@/tools/api";
import { BASE_CURRENCY } from "@/constants/api";

const screenWidth = Dimensions.get("window").width;

export default function RateGraphScreen() {
  const [dates, setDates] = useState<string[]>([]);
  const [rates, setRates] = useState<number[]>([]);
  const { data }: { data: string } = useLocalSearchParams()
  const graphData: GraphFormData = JSON.parse(data);

  async function getRatesData() {
    try {
      const data = await getArchivedRatesOfCurrency({ ...graphData });
      const datesOfData = data.rates.map(({ no, mid, ...dates }) => dates.effectiveDate);
      const ratesOfData = data.rates.map(({ no, effectiveDate, ...rates }) => rates.mid);
      setDates(datesOfData);
      setRates(ratesOfData);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to get archived rates"
      })
    }
  }

  useEffect(() => {
    getRatesData();
  }, [])

  return (
    <ThemedScrollView className=" py-6" contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedText type="title" className="mb-8">
        Rate Graph
      </ThemedText>
      {dates.length > 0 && rates.length > 0 && (
        <View>
          <ThemedText type="subtitle" className="text-center">
            {graphData.code} - {BASE_CURRENCY} Line Chart
          </ThemedText>
          <LineChart
            data={{
              labels: dates,
              datasets: [
                {
                  data: rates,
                },
              ],
            }}
            width={screenWidth - 20}
            height={470}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 4,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              marginHorizontal: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={90}
            xLabelsOffset={0}
          />
        </View>
      )}
    </ThemedScrollView>
  );
}