import { Transaction } from "./currencies.type";
import { Rate } from "./rates.type";

export interface ICurrencyCardProps {
  code: string;
  amount: number;
  loading: boolean;
}

export interface ITransactionsProps {
  baseCurrency: string;
  isSummary: boolean;
  page?: number;
  setMaxPage?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ITransactionItemProps {
  baseCurrency: string;
  transaction: Transaction;
}

export interface ICircleFlagProps {
  code: string;
  width?: string;
  height?: string;
  loading?: boolean;
}

export interface ICurrencyDropdownProps {
  currencies: Rate[];
  onSelect: (index: string) => void;
  loading: boolean;
  code: string;
}