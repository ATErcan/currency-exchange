import axios, { AxiosResponse } from "axios";

import {
  CURRENCY_EXCHANGE_API,
  CURRENCY_EXCHANGE_API_TIMEOUT,
  endpoints,
} from "@/constants/api";
import { Error, ISignUpErrorResponse, IAuthResponse, User } from "@/lib/types/responses/user.type";
import { getValueFor } from "@/utils/expo-secure-store";
import { IFinancialsResponse, ITransactionsResponse } from "@/lib/types/responses/financial.type";

const API = axios.create({
  baseURL: CURRENCY_EXCHANGE_API,
  timeout: CURRENCY_EXCHANGE_API_TIMEOUT,
});

API.interceptors.request.use(
  async (config) => {
    const token = await getValueFor("user_me");
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
)

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
)

export const apiRequest = async <TResponse, TError>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: Record<string, unknown>,
  headers?: Record<string, string>
): Promise<{
  success: { res: AxiosResponse<TResponse> } | null;
  error: { data: TError; status: number } | null;
}> => {
  try {
    const res: AxiosResponse<TResponse> = await API({
      url,
      method,
      data,
      headers
    });
    return { success: { res }, error: null };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: null,
        error: {
          data: error.response.data as TError,
          status: error.response.status,
        },
      };
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};

export const signUp = async ({ name, email, password }: { name: string, email: string, password: string }) => {
  const url = endpoints.signUp;
  const { success, error } = await apiRequest<IAuthResponse, ISignUpErrorResponse>(
    url,
    "POST",
    { name, email, password }
  );

  return { success, error };
}

export const login = async ({ email, password }: { email: string, password: string }) => {
  const url = endpoints.login;
  const { success, error } = await apiRequest<IAuthResponse, Error>(
    url,
    "POST",
    { email, password }
  );

  return { success, error };
}

export const getUserInfo = async () => {
  const url = endpoints.userInfo;
  const { success, error } = await apiRequest<User, Error>(url, "GET");

  return { success, error }
}

export const getFinancials = async () => {
  const url = endpoints.financials;
  const { success, error } = await apiRequest<IFinancialsResponse, Error>(url, "GET");

  return { success, error };
}

export const getAllTransactions = async () => {
  const url = endpoints.allTransactions;
  const { success, error } = await apiRequest<ITransactionsResponse, Error>(url, "GET");

  return { success, error };
}