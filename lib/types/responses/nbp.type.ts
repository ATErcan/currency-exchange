import { CurrencyRate, RatesTable } from "../rates.type";

export type IRatesTableResponse = RatesTable[];

export interface ICurrencyRateResponse {
  table: string;
  currency: string;
  code: string;
  rates: CurrencyRate[]
}