import React, { createContext, useReducer, useState } from "react";
import { mockData } from "../helpers/transactions";
import { ITransaction } from "../models/ITransaction";
import AppReducer from "./AppReducer";

const ENABLE_MOCK_DATA = true;

//@ts-ignore
const mocksData: Map<number, ITransaction> = mockData;
// Initial state
const initialState = {
  transactions: new Map<number, ITransaction>(
    ENABLE_MOCK_DATA ? mocksData : null
  ),
  defaultTransaction: new Map<number, ITransaction>(),
  deleteTransaction: (State: any) => {},
  addTransaction: (State: any) => {},
  editTransaction: (State: any) => {},
  discardTransaction: () => {},
  defaultPresent: false,
  setDefaultPresent: (State: any) => {},
};

export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [defaultPresent, setDefaultPresent] = useState(false);
  // Actions
  const deleteTransaction = (id: any) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  const addTransaction = (transaction: ITransaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  const editTransaction = (id: any) => {
    dispatch({
      type: "EDIT_TRANSACTION",
      payload: id,
    });
  };
  const discardTransaction = () => {
    dispatch({
      type: "DISCARD_TRANSACTION",
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        defaultTransaction: state.defaultTransaction,
        deleteTransaction,
        addTransaction,
        editTransaction,
        defaultPresent,
        setDefaultPresent,
        discardTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
