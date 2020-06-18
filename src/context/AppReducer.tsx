import { addElement, deleteElement } from "../helpers/reducerHelper";

export default (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        defaultTransaction: null,
        transactions: deleteElement(state.transactions, action.payload),
      };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        defaultTransaction: [state.transactions.get(action.payload)],
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        defaultTransaction: null,
        transactions: addElement(state.transactions, action.payload),
      };
    case "DISCARD_TRANSACTION":
      return {
        ...state,
        defaultTransaction: null,
      };
    default:
      return state;
  }
};
