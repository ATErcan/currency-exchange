import { ExchangeData, Transaction, UserFinancial } from "../currencies.type";

export interface IFinancialsResponse {
  data: UserFinancial;
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

export interface IExchangeResponse {
  data: ExchangeData;
}

