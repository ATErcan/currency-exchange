import { useCallback, useEffect, useMemo, useState } from "react";
import { LogBox, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { exchangeCurrencies, getAllCurrencies, getFinancials } from "@/tools/api";
import { Rate } from "@/lib/types/rates.type";
import { getCountriesByCurrency } from "@/utils/getCountry";
import { ThemedIconSymbol } from "@/components/ThemedIconSymbol";
import CurrencyDropdown from "@/components/currency/CurrencyDropdown";
import { UserFinancial } from "@/lib/types/currencies.type";
import { convertToNumber, formatAmount, formatNumber, roundToPrecision } from "@/utils/formatDecimalSeperator";
import { calculateExchangeResult, calculateRate } from "@/utils/currencyFunctions";
import { BASE_CURRENCY_RATE } from "@/constants/utilsConstants";
import { TransactionAmountValidation } from "@/utils/validation";
import { ExchangeRequest } from "@/lib/types/requests/currency.type";
import ThemedInput from "@/components/ThemedInput";

LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX',
]);

export default function ExchangeScreen() {
  const { to, from }: { to: string, from: string } = useLocalSearchParams();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [currencies, setCurrencies] = useState<Rate[]>([BASE_CURRENCY_RATE]);
  const [userFinancial, setUserFinancial] = useState<UserFinancial>();
  const [fromCurrency, setFromCurrency] = useState<Rate>(from ? JSON.parse(from) : BASE_CURRENCY_RATE);
  const [toCurrency, setToCurrency] = useState<Rate>(to ? JSON.parse(to) : BASE_CURRENCY_RATE);
  const [toCurrencyValue, setToCurrencyValue] = useState<string>("0,00");

  async function fetchCurrencies() {
    try {
      const [tableA, tableB] = await getAllCurrencies();
      if(tableA.status === "fulfilled") {
        setCurrencies(prevCurrencies => [...prevCurrencies, ...tableA.value.rates])
      }
      if(tableB.status === "fulfilled") {
        setCurrencies(prevCurrencies => [...prevCurrencies, ...tableB.value.rates])
      }
      if(tableA.status === "rejected" || tableB.status === "rejected") {
        Toast.show({
          type: "error",
          text1: "Failed to get all currencies",
        });
      }
    } catch(error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
    } finally {
      setIsFetching(false);
    }
  }

  async function getFinancialData() {
    const { success, error } = await getFinancials();
    if(error) {
      Toast.show({
        type: "error",
        text1: error.data.message
      });
    } else if(success) {
      const data = success?.res.data.data;
      setUserFinancial(data);
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
      });
    }
  }

  useEffect(() => {
    fetchCurrencies();
    try {
      getFinancialData();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
      });
    }
  }, []);

  useEffect(() => {
    const filteredCurrencies = currencies.filter((currency) =>
      getCountriesByCurrency(currency.code)
    );
    setCurrencies(filteredCurrencies);
    setLoading(false);
  }, [isFetching]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof TransactionAmountValidation>>({
    resolver: zodResolver(TransactionAmountValidation),
    defaultValues: {
      amount: "",
    },
  });

  const fromCurrencyValue = watch("amount");

  const exchangeRate = useMemo(
    () => calculateRate(fromCurrency.mid, toCurrency.mid),
    [fromCurrency, toCurrency]
  );

  useEffect(() => {
    const calculateToValue = () => {
      if (fromCurrencyValue) {
        const numericAmount = parseFloat(fromCurrencyValue.replace(/\./g, "").replace(",", "."));
        const exchangeResult = calculateExchangeResult(numericAmount, exchangeRate);
        const formattedResult = formatNumber(formatAmount(exchangeResult));
        setToCurrencyValue(formattedResult);
      } else {
        setToCurrencyValue("0,00");
      }
    };

    calculateToValue();
  }, [fromCurrencyValue, exchangeRate]);

  

  const onSubmit = async (data: z.infer<typeof TransactionAmountValidation>) => {
    const fromCurrencyAmount = convertToNumber(data.amount);
    const toCurrencyAmount = calculateExchangeResult(fromCurrencyAmount, exchangeRate);
    const exchangeData: ExchangeRequest = {
      from: {
        code: fromCurrency.code,
        amount: fromCurrencyAmount,
        mid: fromCurrency.mid,
      },
      to: {
        code: toCurrency.code,
        amount: toCurrencyAmount,
        mid: toCurrency.mid,
      },
      rate: exchangeRate,
    };
    const { success, error } = await exchangeCurrencies(exchangeData);
    if(error) {
      Toast.show({
        type: "error",
        text1: error.data.message,
      });
    } else if(success) {
      const { financial, transaction } = success.res.data.data;
      const { balance, baseCurrency } = financial;
      const data = { balance, baseCurrency, transaction };
      router.push({
        pathname: "/transaction-success",
        params: { data: JSON.stringify(data) }
      })
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
      });
    }
  };

  const handleSelectFromCurrency = useCallback((index: string) => {
    setFromCurrency(currencies[+index]);
  }, [currencies]);

  const handleSelectToCurrency = useCallback((index: string) => {
    setToCurrency(currencies[+index]);
  }, [currencies]);

  const fromCurrencyBalance = useMemo(() => {
    if(fromCurrency.code === "PLN" && userFinancial) return formatAmount(roundToPrecision(userFinancial?.balance));

    const selectedCurrency = userFinancial?.currencies.find(currency => currency.code === fromCurrency.code);
    return selectedCurrency ? formatAmount(roundToPrecision(selectedCurrency.amount)) : "0,00";
  }, [userFinancial, fromCurrency])

  const handleFromChange = (value: string) => {
    const numericAmount = parseFloat(value.replace(/\./g, "").replace(",", "."));

    if (!isNaN(numericAmount)) {
      const exchangeResult = calculateExchangeResult(numericAmount, exchangeRate);
      const [integer] = exchangeResult.toString().split(".");

      if (integer.length <= 9) {
        const formattedValue = formatNumber(value);
        setValue("amount", formattedValue, { shouldValidate: true });
      } else {
        Toast.show({
          type: "error",
          text1: "Exchange result is exceeding the maximum limit!",
        });
      }
    } else {
      setValue("amount", "", { shouldValidate: true });
    }
  };

  return (
    <ThemedScrollView
      className="px-4 py-6"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View>
        <ThemedText type="title" className="mb-2">
          Exchange
        </ThemedText>
        <View className="mt-2">
          <ThemedView
            className="w-full h-16 flex-row items-center justify-between gap-2 pr-4 border border-gray-300 rounded-2xl"
            lightColor="#e5e7eb"
            darkColor="#262626"
          >
            <Controller
              control={control}
              name="amount"
              render={({ field: { value } }) => (
                <ThemedInput
                  keyboardType="numeric"
                  value={value}
                  onChangeText={(text) => handleFromChange(text)}
                  className="flex-1 h-full p-2 text-3xl"
                  placeholder="0,00"
                  darkColor="#d1d5db"
                />
              )}
            />
            <CurrencyDropdown
              currencies={currencies}
              onSelect={handleSelectFromCurrency}
              loading={loading}
              code={fromCurrency.code}
            />
          </ThemedView>
          {errors.amount && (
            <Text className="text-red-500">{errors.amount.message}</Text>
          )}
          <ThemedText
            style={{ fontSize: 14, lineHeight: 20 }}
            lightColor="#737373"
            darkColor="#e5e7eb"
          >
            You have{" "}
            <Text className="font-bold underline ">
              {fromCurrency.code} {fromCurrencyBalance}
            </Text>{" "}
            in your balance
          </ThemedText>
        </View>
        <View className="flex-row justify-between gap-2 my-12">
          <View className="flex-row items-center gap-2">
            <ThemedView
              className="w-7 h-7 rounded-full items-center justify-center overflow-hidden"
              lightColor="#e5e7eb"
              darkColor="#262626"
            >
              <ThemedIconSymbol
                size={12}
                name="multiply"
                lightColor="#262626"
                darkColor="#e5e7eb"
              />
            </ThemedView>
            <ThemedText lightColor="#262626" darkColor="#e5e7eb">
              {formatAmount(exchangeRate)}
            </ThemedText>
          </View>
          <ThemedText lightColor="#262626" darkColor="#e5e7eb">
            Exchange Rate
          </ThemedText>
        </View>
        <View>
          <ThemedText
            style={{ fontSize: 14, lineHeight: 20 }}
            lightColor="#737373"
            darkColor="#e5e7eb"
          >
            To your {toCurrency.code} balance
          </ThemedText>
          <ThemedView
            className="w-full h-16 flex-row items-center justify-between gap-2 pr-4 border border-gray-300 rounded-2xl"
            lightColor="#e5e7eb"
            darkColor="#262626"
          >
            <ThemedInput
              keyboardType="numeric"
              editable={false}
              value={toCurrencyValue}
              className="flex-1 h-full p-2 text-3xl opacity-45"
              placeholder="0,00"
              darkColor="#d1d5db"
            />
            <CurrencyDropdown
              currencies={currencies}
              onSelect={handleSelectToCurrency}
              loading={loading}
              code={toCurrency.code}
            />
          </ThemedView>
        </View>
      </View>
      <TouchableOpacity
        className="bg-blue-500 px-12 py-4 rounded-2xl mb-8"
        onPress={handleSubmit(onSubmit)}
      >
        <ThemedText className="text-center font-bold" lightColor="#e5e7eb">
          Exchange
        </ThemedText>
      </TouchableOpacity>
    </ThemedScrollView>
  );
}
