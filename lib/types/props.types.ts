import { Transaction } from "./currencies.type";
import { Rate, Tables } from "./rates.type";

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

export interface IAvatarProps {
  name: string | undefined;
  width?: string;
  height?: string;
  textType?: "default" | "title" | "defaultSemiBold" | "subtitle";
}

export interface ICurrencyItemProps {
  code: string;
  table: Tables;
}