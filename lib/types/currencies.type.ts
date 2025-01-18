export type SingleCurrency = {
  code: string;
  amount: number;
}

export type Currency = {
  _id: string;
  code: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  _v: number;
  _id: string;
  userId: string;
  type: "fund" | "exchange";
  amount?: number;
  exchangeRate?: number;
  from?: SingleCurrency;
  to?: SingleCurrency;
  createdAt: string;
  updatedAt: string;
};