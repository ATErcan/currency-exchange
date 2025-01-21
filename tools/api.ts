import axios, { AxiosResponse } from "axios";

import {
  CURRENCY_EXCHANGE_API,
  CURRENCY_EXCHANGE_API_TIMEOUT,
  endpoints,
  NBP_WEB_API,
  NBP_WEB_API_TIMEOUT,
} from "@/constants/api";
import { Error, ISignUpErrorResponse, IAuthResponse, User } from "@/lib/types/responses/user.type";
import { getValueFor } from "@/utils/expo-secure-store";
import { IAddFundsResponse, IExchangeResponse, IFinancialsResponse, ITransactionsResponse } from "@/lib/types/responses/financial.type";
import { ICurrencyRateResponse, IRatesTableResponse } from "@/lib/types/responses/nbp.type";
import { RatesTable } from "@/lib/types/rates.type";
import { ExchangeRequest } from "@/lib/types/requests/currency.type";

const CurrencyAPI = axios.create({
  baseURL: CURRENCY_EXCHANGE_API,
  timeout: CURRENCY_EXCHANGE_API_TIMEOUT,
});

const NBPWebAPI = axios.create({
  baseURL: NBP_WEB_API,
  timeout: NBP_WEB_API_TIMEOUT
});

CurrencyAPI.interceptors.request.use(
  async (config) => {
    const token = await getValueFor("user_me");
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
)

CurrencyAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
)

export const apiRequest = async <TResponse, TError, TData = unknown>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: TData,
  headers?: Record<string, string>
): Promise<{
  success: { res: AxiosResponse<TResponse> } | null;
  error: { data: TError; status: number } | null;
}> => {
  try {
    const res: AxiosResponse<TResponse> = await CurrencyAPI({
      url,
      method,
      data,
      headers,
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

export const getAllTransactions = async (page: number = 1) => {
  const url = `${endpoints.allTransactions}?page=${page}`;
  const { success, error } = await apiRequest<ITransactionsResponse, Error>(url, "GET");

  return { success, error };
}

export const addFunds = async ( amount: number ) => {
  const url = endpoints.addFunds;
  const { success, error } = await apiRequest<IAddFundsResponse, Error>(
    url,
    "PATCH",
    { amount }
  );

  return { success, error };
}

export const exchangeCurrencies = async (data: ExchangeRequest) => {
  const url = endpoints.exchange;
  const { success, error } = await apiRequest<IExchangeResponse, Error, ExchangeRequest>(
    url,
    "POST",
    data
  )

  return { success, error };
}

// NBP WEB API
export const getAllCurrenciesByTable = async (table = "a"): Promise<RatesTable> => {
  try {
    const { data }: { data: IRatesTableResponse } = await NBPWebAPI.get(`/tables/${table}/?format=json`);
    return data[0];
  } catch (error) {
    throw new Error(`Failed to fetch currency rates`);
  }
};

export const getAllCurrencies = async () => {
  try {
    const [tableA, tableB] = await Promise.allSettled([getAllCurrenciesByTable("a"), getAllCurrenciesByTable("b")]);
    if(tableA.status === "rejected" && tableB.status === "rejected") {
      throw new Error("NBP API tables are unavailable. Please try again later.");
    }
    return [tableA, tableB]
  } catch (error) {
    throw new Error(`Failed to fetch currency rates`);
  }
}

export const getCurrencyRate = async (table: string, code: string) => {
  try {
    const { data }: { data: ICurrencyRateResponse } = await NBPWebAPI.get(`/rates/${table}/${code}?format=json`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch currency rate`);
  }
}

export const findCurrencyRate = async (code: string) => {
  try {
    const [tableA, tableB] = await Promise.allSettled([getCurrencyRate("a", code), getCurrencyRate("b", code)]);
    if(tableA.status === "rejected" && tableB.status === "rejected") {
      throw new Error("NBP API tables are unavailable. Please try again later.");
    }
    if(tableA.status === "fulfilled") {
      return tableA.value;
    }
    if(tableB.status === "fulfilled") {
      return tableB.value;
    }
  } catch (error) {
    throw error;
  }
}