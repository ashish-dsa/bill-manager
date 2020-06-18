import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { monthNameToNumber, months } from "../../helpers/utils";
import { ITransaction } from "../../models/ITransaction";
import { SelectDropdown } from "../common/SelectDropdown";
import { Transaction } from "../transaction/Transaction";
import "./History.css";
export const History = () => {
  const {
    transactions,
  }: {
    transactions: Map<number, ITransaction>;
  } = useContext(GlobalContext);
  const [listCategory, setListCategory] = useState("Select all");
  const [listMonth, setListMonth] = useState("Select all");
  const [amount, setAmount] = useState(undefined);

  let transactionsArray = Array.from(transactions.values()).map(
    (transaction) => {
      return { ...transaction, selected: false };
    }
  );

  const getCategories = () => {
    const categorySet = new Set();
    transactionsArray.forEach((value) => categorySet.add(value.category));
    return Array.from(categorySet.values()).map((value) => {
      return { category: value };
    });
  };

  const filterByParams = () => {
    transactionsArray = transactionsArray.sort((a, b) =>
      a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0
    );
    transactionsArray = transactionsArray.filter((transaction) => {
      if (listCategory === "Select all") {
        return transaction;
      } else if (transaction.category === listCategory) {
        return transaction;
      } else {
        return null;
      }
    });
    transactionsArray = transactionsArray.filter((transaction) => {
      if (listMonth === "Select all") {
        return transaction;
      } else if (
        transaction.date.toString().split("-")[1] ===
        monthNameToNumber[listMonth]
      ) {
        return transaction;
      } else {
        return null;
      }
    });

    let currentAmount = Number(amount);
    transactionsArray = transactionsArray.map((transaction) => {
      if (currentAmount - transaction.amount >= 0) {
        currentAmount -= transaction.amount;
        transaction.selected = true;
      }
      return transaction;
    });

    return transactionsArray;
  };

  return (
    <div className="history">
      <h3>History</h3>
      <div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
        <div
          className="drop-down"
          style={{ flexDirection: "column", display: "flex" }}
        >
          <label htmlFor="amount">Category</label>
          <SelectDropdown
            dropdowns={getCategories()}
            stateUpdater={setListCategory}
            dropDownparam={"category"}
          />
        </div>
        <div
          className="drop-down"
          style={{ flexDirection: "column", display: "flex" }}
        >
          <label htmlFor="amount">Month</label>
          <SelectDropdown
            dropdowns={months}
            stateUpdater={setListMonth}
            dropDownparam={"name"}
          />
        </div>
        <div
          className="drop-down"
          style={{ flexDirection: "column", display: "flex" }}
        >
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              className="budget-amount"
              type="number"
              value={amount}
              required
              min="0"
              onChange={(e) => {
                setAmount(e.target.valueAsNumber);
              }}
              placeholder="Enter amount..."
            />
          </div>
        </div>
      </div>
      <ul className="list">
        {filterByParams().map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
};
