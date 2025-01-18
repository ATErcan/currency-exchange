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
  _v: number;
  _id: string;
  userId: string;
  type: "fund";
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type Exchange = {
  _v: number;
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