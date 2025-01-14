export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
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

export interface ISignUpResponse {
  jwt: {
    token: string;
  },
  user: {
    id: string;
    name: string;
    email: string;
  }
}