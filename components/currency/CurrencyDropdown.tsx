import React from "react";
import { View } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

import { ICurrencyDropdownProps } from "@/lib/types/props.types";
import { ThemedView } from "../ThemedView";
import CircleFlag from "./CircleFlag";
import { ThemedText } from "../ThemedText";

function DropdownItem({ code }: { code: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <CircleFlag code={code} width="w-10" height="h-10" />
      <ThemedText type="defaultSemiBold">{code}</ThemedText>
    </View>
  );
}

function CurrencyDropdown({ currencies, onSelect, loading, code }: ICurrencyDropdownProps) {
  return (
    <ModalDropdown
      options={currencies.map((currency) => currency.code)}
      dropdownStyle={{ width: 120, height: 300 }}
      dropdownTextStyle={{ fontSize: 16, padding: 8 }}
      textStyle={{ color: "#000", fontSize: 18 }}
      onSelect={onSelect}
      disabled={loading}
      renderRow={(option) => {
        return (
          <ThemedView key={option} lightColor="#e5e7eb" darkColor="#262626" style={{ flexDirection: "row", alignItems: "center", padding: 10, gap: 10 }}>
            <CircleFlag code={option} width="w-6" height="h-6" />
            <ThemedText>{option}</ThemedText>
          </ThemedView>
        );
      }}
    >
      <DropdownItem key={code} code={code}  />
    </ModalDropdown>
  )
}

export default React.memo(CurrencyDropdown);