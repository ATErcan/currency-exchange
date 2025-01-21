export const CURRENCY_EXCHANGE_API = "http://192.168.0.175:8080/api";
export const CURRENCY_EXCHANGE_API_TIMEOUT = 5000;

export const NBP_WEB_API = "https://api.nbp.pl/api/exchangerates";
export const NBP_WEB_API_TIMEOUT = 5000;

export const endpoints = {
  signUp: "/auth/signup",
  login: "/auth/login",
  userInfo: "/users/me",
  allTransactions: "/users/me/transactions",
  financials: "/financial",
  addFunds: "/financial/fund",
  exchange: "/financial/exchange",
};