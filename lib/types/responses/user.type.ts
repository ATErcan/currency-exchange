export interface User {
  data: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Error {
  message: string;
}

export interface ISignUpErrorResponse {
  message: {
    name: string;
    email: string;
    password: string;
  } | string;
}

type AuthUser = {
  id: string;
  name: string;
  email: string;
}
export interface IAuthResponse {
  jwt: {
    token: string;
  },
  user: AuthUser
}

export type Currency = {
  _id: string;
  code: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

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