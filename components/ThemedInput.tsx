import { TextInput, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};
export default function ThemedInput({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedInputProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return <TextInput style={[{ color }, style]} {...otherProps} />;
}
