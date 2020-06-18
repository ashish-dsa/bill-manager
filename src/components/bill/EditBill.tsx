import React, { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ITransaction } from "../../models/ITransaction";
import { Bill } from "./Bill";
import "./Bill.css";
export const EditBill = () => {
  const {
    addTransaction,
    defaultTransaction,
    deleteTransaction,
  }: {
    addTransaction: (State: any) => void;
    defaultTransaction: Map<number, ITransaction>;
    transactions: Map<number, ITransaction>;
    deleteTransaction: (State: any) => void;
  } = useContext(GlobalContext);

  const stateInitializer = useCallback(
    (parameter) => {
      if (defaultTransaction && defaultTransaction[0]) {
        if (defaultTransaction[0][parameter]) {
          return defaultTransaction[0][parameter];
        }
      }
      return "";
    },
    [defaultTransaction]
  );

  const [category, setCategory] = useState(stateInitializer("category"));
  const [description, setDescription] = useState(
    stateInitializer("description")
  );
  const [billDate, setBillDate] = useState(stateInitializer("date"));
  const [amount, setAmount] = useState(stateInitializer("amount"));

  useEffect(() => {
    setCategory(stateInitializer("category"));
    setDescription(stateInitializer("description"));
    setBillDate(stateInitializer("date"));
    setAmount(stateInitializer("amount"));
  }, [stateInitializer, defaultTransaction]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: defaultTransaction[0].id,
      description: description,
      amount: +amount,
      category: category,
      date: billDate,
    };
    deleteTransaction(newTransaction.id);
    addTransaction(newTransaction);
    resetState();
  };
  const resetState = () => {
    setCategory("");
    setDescription("");
    setAmount("");
    setBillDate("");
  };
  if (!defaultTransaction || !defaultTransaction[0]) {
    return null;
  }

  return (
    <Bill
      onSubmit={onSubmit}
      category={category}
      setCategory={setCategory}
      description={description}
      setDescription={setDescription}
      amount={amount}
      setAmount={setAmount}
      billDate={billDate}
      setBillDate={setBillDate}
      defaultTransaction={defaultTransaction}
    />
  );
};
