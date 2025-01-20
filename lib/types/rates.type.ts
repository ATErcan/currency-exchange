export type Rate = {
  currency: string;
  code: string;
  mid: number;
}

export interface RatesTable {
  table: string;
  no: string;
  effectiveDate: string;
  rates: Rate[];
}
