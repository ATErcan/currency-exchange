import { getAllISOByCurrencyOrSymbol } from "iso-country-currency";

export const getCountriesByCurrency = (code: string) => {
  try {
    return getAllISOByCurrencyOrSymbol("currency", code);
  } catch (error) {
    console.log(error)
  }
};