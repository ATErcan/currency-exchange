import { FLOATING_POINT } from "@/constants/utilsConstants";

export function formatDecimalSeparator(whole: string) {
  let result = "";
  let digits = 0;
  for (let i = whole.length - 1; i >= 0; i--) {
    result = whole[i] + result;

    if (++digits % 3 === 0 && i > 0) {
      result = "." + result;
    }
  }
  return result;
}

export function formatAmount(subtotal: number) {
  const decimalAmount = `${subtotal}`;
  const [whole, fraction] = decimalAmount.split(".");
  const wholeFormatted = formatDecimalSeparator(whole);
  if (decimalAmount.includes(".")) {
    return `${wholeFormatted},${fraction}`;
  } else {
    return `${wholeFormatted},00`
  }
}

export function roundToPrecision(number: number, precision: number = 2) {
  const factor = 10 ** precision;
  return Math.trunc(number * factor) / factor;
}

export const formatNumber = (value: string, floatingPoint: number = FLOATING_POINT) => {
  const cleanValue = value.replace(/[^\d,]/g, ""); // Remove invalid characters
  const [integerPart, decimalPart] = cleanValue.split(",");

  // Ensure the integer part is truncated to 9 digits
  const truncatedInteger = integerPart?.slice(0, 9);

  // Format the truncated integer part with dots for thousands
  const formattedInteger = truncatedInteger
    ?.replace(/\./g, "") // Remove existing dots
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots for thousands

  return decimalPart !== undefined
    ? `${formattedInteger},${decimalPart.slice(0, 2)}`
    : formattedInteger;
};
