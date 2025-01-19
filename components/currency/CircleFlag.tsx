import CountryFlag from "react-native-country-flag";

import { ThemedView } from "../ThemedView";
import { ICircleFlagProps } from "@/lib/types/props.types";

export default function CircleFlag({
  country,
  loading,
  width = "w-14",
  height = "h-14"
}: ICircleFlagProps) {
  return (
    <ThemedView
      className={`${width} ${height} rounded-full items-center justify-center overflow-hidden border border-gray-200`}
      lightColor="#111827"
    >
      {!loading && (
        <CountryFlag
          isoCode={country}
          size={36}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </ThemedView>
  );
}