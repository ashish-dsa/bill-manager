import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ITransaction } from "../../models/ITransaction";
import "./Transaction.css";
export const Transaction = ({ transaction }: { transaction: ITransaction }) => {
  const {
    deleteTransaction,
    editTransaction,
    setDefaultPresent,
  }: {
    deleteTransaction: (State: any) => void;
    editTransaction: (State: any) => void;
    setDefaultPresent: (State: any) => void;
  } = useContext(GlobalContext);

  return (
    <li style={{ background: transaction.selected ? "yellow" : "white" }}>
      <button
        onClick={() => {
          deleteTransaction(transaction.id);
        }}
        className="delete-btn"
      >
        x
      </button>
      <div className="show-ellipsis">{transaction.description}</div>
      <div className="show-ellipsis">{transaction.category}</div>
      <div className="show-ellipsis">
        {transaction.date.toString().split("-").reverse().join("-")}
      </div>

      <span className="show-ellipsis">
        &#x20b9;{Math.abs(transaction.amount)}
      </span>

      <button
        onClick={() => {
          editTransaction(transaction.id);
          setDefaultPresent(true);
        }}
        className="edit-btn"
      >
        e
      </button>
    </li>
  );
};
