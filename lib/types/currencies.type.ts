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

export type Fund = {
  __v: number;
  _id: string;
  userId: string;
  type: "fund";
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type Exchange = {
  __v: number;
  _id: string;
  userId: string;
  type: "exchange";
  exchangeRate: number;
  from: SingleCurrency;
  to: SingleCurrency;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = Fund | Exchange;

export type UserFinancial = {
  __v: number;
  _id: string;
  userId: string;
  balance: number;
  currencies: Currency[];
  baseCurrency: string;
};

export interface ExchangeData {
  financial: Omit<UserFinancial, "__v" | "_id" | "userId">;
  transaction: Exchange;
}

export interface TransactionDetails {
  transaction: Transaction;
  balance: number;
  baseCurrency: string;
}