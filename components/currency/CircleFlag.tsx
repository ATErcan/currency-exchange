import CountryFlag from "react-native-country-flag";

import { ThemedView } from "../ThemedView";
import { ICircleFlagProps } from "@/lib/types/props.types";
import { getCountriesByCurrency } from "@/utils/getCountry";
import Toast from "react-native-toast-message";

export default function CircleFlag({
  code,
  loading,
  width = "w-14",
  height = "h-14"
}: ICircleFlagProps) {
  const country = getCountriesByCurrency(code);

  if(!country) {
    Toast.show({
      type: "error",
      text1: `${code} wasn't found incurrency.`
    })
    return null;
  };
  return (
    <ThemedView
      className={`${width} ${height} rounded-full items-center justify-center overflow-hidden border border-gray-200`}
      lightColor="#111827"
    >
      {!loading && (
        <CountryFlag
          isoCode={country[0]}
          size={36}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </ThemedView>
  );
}