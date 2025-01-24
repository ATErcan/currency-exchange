export type Rate = {
  currency: string;
  code: string;
  mid: number;
}

export type Tables = "a" | "b";

export interface RatesTable {
  table: string;
  no: string;
  effectiveDate: string;
  rates: Rate[];
}

export type CurrencyRate = {
  no: string;
  effectiveDate: string;
  mid: number;
};

export type GraphFormData = {
  startDate: string;
  endDate: string;
  code: string;
  table: Tables;
}