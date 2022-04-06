// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  expense,
});

export const fetchCurrencies = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  delete data.USDT;
  const moedas = Object.keys(data);
  dispatch(saveCurrencies(moedas));
};

export const dispatchExpense = (expense) => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  expense.exchangeRates = data;
  dispatch(saveExpense(expense));
};
