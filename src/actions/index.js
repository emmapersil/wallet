// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const EXPENSES = 'EXPENSES';
export const CURRENCIES = 'CURRENCIES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  email,
});

export const addExpense = (payload, exchangeRates) => ({
  type: EXPENSES,
  payload,
  exchangeRates,
});

export const fetchExchange = (payload) => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((exchanges) => dispatch(addExpense(payload, exchanges)));

export const addCurrencies = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => {
      const maxLength = 3;
      const getCurrencies = Object.keys(currencies)
        .filter((currency) => currency.length === maxLength);
      dispatch(addCurrencies(getCurrencies));
    });
};

export const changeExpense = (idToChange) => ({
  type: EDIT_EXPENSE,
  idToChange,
});

export const saveEditExpense = (expenseEdited) => ({
  type: SAVE_EDIT_EXPENSE,
  expenseEdited,
});

export const deleteExpense = (idToDelete) => ({
  type: DELETE_EXPENSE,
  idToDelete,
});
