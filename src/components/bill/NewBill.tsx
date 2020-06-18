import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ITransaction } from "../../models/ITransaction";
import { Bill } from "./Bill";
import "./Bill.css";
import { EditBill } from "./EditBill";

export const NewBill = () => {
  const {
    addTransaction,
    defaultTransaction,
    transactions,
    deleteTransaction,
  }: {
    addTransaction: (State: any) => void;
    defaultTransaction: Map<number, ITransaction>;
    transactions: Map<number, ITransaction>;
    deleteTransaction: (State: any) => void;
  } = useContext(GlobalContext);

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [billDate, setBillDate] = useState("");
  const [amount, setAmount] = useState(undefined);

  const generateId = () => {
    let randomId = Math.floor(Math.random() * 1000);
    while (transactions.has(randomId)) {
      randomId = Math.floor(Math.random() * 1000);
    }
    return randomId;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: generateId(),
      description: description,
      amount: +amount,
      category: category,
      date: billDate,
      select: false,
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
  if (defaultTransaction && defaultTransaction[0]) {
    return <EditBill />;
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
