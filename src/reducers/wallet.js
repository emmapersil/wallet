// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES,
  EXPENSES,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  SAVE_EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpense: false,
};

const addNewExpense = (payload, exchangeRates) => (
  {
    id: payload.id,
    value: payload.value,
    currency: payload.currency,
    description: payload.description,
    method: payload.method,
    tag: payload.tag,
    exchangeRates,
  }
);

const wallet = (
  state = INITIAL_STATE, {
    payload, exchangeRates, type, currencies, idToDelete, idToChange, expenseEdited,
  },
) => {
  switch (type) {
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, addNewExpense(payload, exchangeRates)],
    };
  case CURRENCIES:
    return {
      ...state,
      currencies,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editExpense: true,
      expenseToChange: state.expenses[idToChange],
    };
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === expenseEdited.id) {
          return expenseEdited;
        }
        return expense;
      }),
      editExpense: false,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== idToDelete),
    };
  default:
    return state;
  }
};

export default wallet;
