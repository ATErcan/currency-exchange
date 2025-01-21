import { PRECISION } from "@/constants/utilsConstants";

const roundToPrecision = (number: number, precision: number = PRECISION) => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

export const calculateRate = (from: number, to: number) => {
  return roundToPrecision(from / to, 6);
}

export const calculateExchangeResult = (from: number, rate: number) => {
  return roundToPrecision(from * rate, 6);
}