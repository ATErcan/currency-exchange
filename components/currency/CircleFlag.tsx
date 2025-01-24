import { useMemo } from "react";
import { Image } from "react-native";
import CountryFlag from "react-native-country-flag";

import { ThemedView } from "../ThemedView";
import { ICircleFlagProps } from "@/lib/types/props.types";
import { getCountriesByCurrency } from "@/utils/getCountry";
import { ThemedIconSymbol } from "../ThemedIconSymbol";

export default function CircleFlag({
  code,
  loading,
  width = "w-14",
  height = "h-14"
}: ICircleFlagProps) {
  const country = useMemo(() => {
    const countries = getCountriesByCurrency(code);
    if (code === "USD") return "US";
    if (code === "EUR") return code;
    return countries;
  }, [code]);

  if(!country) {
    return <ThemedIconSymbol size={32} name="globe" lightColor="#000" darkColor="#e5e7eb" />;
  };
  return (
    <ThemedView
      className={`${width} ${height} rounded-full items-center justify-center overflow-hidden border border-gray-200`}
      lightColor="#111827"
    >
      {!loading &&
        country === "EUR" ?
        (
          <Image
            source={require("../../assets/images/eu-uni.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <CountryFlag
            isoCode={typeof country === "string" ? country : country[0]}
            size={36}
            style={{ width: "100%", height: "100%" }}
          />
        )}
    </ThemedView>
  );
}