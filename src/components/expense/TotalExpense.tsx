import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ITransaction } from "../../models/ITransaction";
import { TimeSeriesChart } from "../chart/TimeSeriesChart";
import "./TotalExpense.css";
export const TotalExpense = () => {
  const {
    transactions,
  }: { transactions: Map<number, ITransaction> } = useContext(GlobalContext);
  let expense = 0;
  transactions.forEach((transaction) => (expense += transaction.amount));

  return (
    <div className="total-expenses">
      <div className="inc-exp-container">
        <div>
          <h4>Total</h4>
          <p className="money minus"> &#x20b9;{expense}</p>
        </div>
      </div>
      <TimeSeriesChart />
    </div>
  );
};
