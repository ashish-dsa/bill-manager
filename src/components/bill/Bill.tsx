import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./Bill.css";

export const Bill = ({
  onSubmit,
  category,
  setCategory,
  description,
  setDescription,
  amount,
  setAmount,
  billDate,
  setBillDate,
  defaultTransaction,
}) => {
  const {
    discardTransaction,
    setDefaultPresent,
  }: {
    discardTransaction: () => void;
    setDefaultPresent: (State: any) => void;
  } = useContext(GlobalContext);
  const resetState = () => {
    setCategory("");
    setDescription("");
    setAmount("");
    setBillDate("");
  };
  return (
    <div className="new-bill">
      <h3>
        {defaultTransaction
          ? defaultTransaction[0]
            ? "Edit Bill"
            : "New Bill"
          : "New Bill"}
      </h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            value={category}
            required
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            placeholder="Enter Category..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter Value..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
          </label>
          <input
            className="bill-amount"
            type="number"
            min="0"
            value={amount}
            required
            onChange={(e) => {
              setAmount(e.target.valueAsNumber);
            }}
            placeholder="Enter amount..."
          />
        </div>
        <div className="form-control">
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>Date</div>
          <input
            type="date"
            required
            value={billDate}
            onChange={(e) => {
              setBillDate(e.target.value);
            }}
          />
        </div>
        <button
          className="btn"
          type={"submit"}
          onSubmit={() => {
            onSubmit();
          }}
        >
          {defaultTransaction
            ? defaultTransaction[0]
              ? "Modify Bill"
              : "Add Bill"
            : "Add Bill"}
        </button>
        {category || description || amount || billDate ? (
          <button
            className="btn"
            onClick={() => {
              resetState();
              discardTransaction();
              setDefaultPresent(false);
            }}
          >
            {"Discard changes"}
          </button>
        ) : null}
      </form>
    </div>
  );
};
