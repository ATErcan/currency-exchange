import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';
import { SymbolWeight } from 'expo-symbols';

import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol, IconSymbolName } from './ui/IconSymbol';

export type ThemedIconProps = {
  name: IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIconSymbol({
  name,
  size = 24,
  color,
  style,
  lightColor,
  darkColor
}: ThemedIconProps) {
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const finalColor = color || themeColor;

  return <IconSymbol name={name} size={size} color={finalColor} style={style} />;
}
