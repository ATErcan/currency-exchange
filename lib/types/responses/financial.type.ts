import { Currency, Transaction } from "../currencies.type";

export interface IFinancialsResponse {
  data: {
    __v: number;
    _id: string;
    userId: string;
    balance: number;
    currencies: Currency[];
    baseCurrency: string;
  };
}

export interface ITransactionsResponse {
  data: Transaction[];
}

export interface IAddFundsResponse {
  data: {
    transaction: Transaction;
    balance: number;
    baseCurrency: string;
  }
}