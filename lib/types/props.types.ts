import { Transaction } from "./currencies.type";

export interface ICurrencyCardProps {
  code: string;
  amount: number;
  loading: boolean;
}

export interface ITransactionsProps {
  baseCurrency: string;
}

export interface ITransactionItemProps extends ITransactionsProps {
  transaction: Transaction;
}

export interface ICircleFlagProps {
  country: string;
  width?: string;
  height?: string;
  loading?: boolean;
}