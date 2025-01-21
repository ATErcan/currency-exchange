export interface ExchangeRequest {
  from: {
    code: string;
    amount: number;
    mid: number;
  },
  to: {
    code: string;
    amount: number;
    mid: number;
  },
  rate: number;
}