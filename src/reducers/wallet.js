import { SAVE_CURRENCIES, SAVE_EXPENSE, REMOVE_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  default:
    return state;
  }
};

export default wallet;
