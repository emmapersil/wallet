// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const EXPENSE = 'EXPENSE';
export const DELETE = 'DELETE';

export function userLogin(email) {
  return {
    type: USER_LOGIN,
    email,
  };
}

export function addExpense(payload, exchangeRates) {
  return {
    type: EXPENSE,
    payload,
    exchangeRates,
  };
}

export const fetchExchange = (payload) => async (dispach) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  dispach(addExpense({ ...payload, exchangeRates: json }));
};

export const deleteExpense = (id) => (
  {
    type: DELETE,
    id,
  });
