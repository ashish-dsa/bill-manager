import React, { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import { GlobalContext } from "../../context/GlobalState";
import {
  computeCalendar,
  monthNameToNumber,
  months,
} from "../../helpers/utils";
import { ITransaction } from "../../models/ITransaction";
import { SelectDropdown } from "../common/SelectDropdown";
import "./TimeSeriesChart.css";
export const TimeSeriesChart = () => {
  const {
    transactions,
  }: {
    transactions: Map<number, ITransaction>;
  } = useContext(GlobalContext);
  const myCalendar = computeCalendar();
  const [listMonth, setListMonth] = useState("Select all");
  transactions.forEach((transaction) => {
    const tempDates = transaction.date.toString().split("-");
    const tempMonth = myCalendar.get(Number(tempDates[1]));
    const tempDay = tempMonth.monthlyExpense.get(Number(tempDates[2]));
    tempDay.amount += transaction.amount;
    tempMonth.amount += transaction.amount;
    tempMonth.monthlyExpense.set(Number(tempDates[2]), tempDay);
    myCalendar.set(Number(tempDates[1]), tempMonth);
  });

  let expenseArray = [];
  if (listMonth === "Select all") {
    myCalendar.forEach((entry) => {
      expenseArray.push(entry.amount);
    });
  } else {
    const currentMonth = myCalendar.get(Number(monthNameToNumber[listMonth]));
    currentMonth.monthlyExpense.forEach((entry) => {
      expenseArray.push(entry.amount);
    });
  }
  let labelArray = [];

  if (listMonth === "Select all") {
    labelArray = months.map((monthObj) => {
      return monthObj.name;
    });
  } else {
    const currentMonth = myCalendar.get(Number(monthNameToNumber[listMonth]));
    let N = currentMonth.monthlyExpense.size;
    labelArray = Array.from({ length: N }, (v, k) => k + 1);
  }
  const dataSet = {
    labels: labelArray,
    datasets: [
      {
        label: "Expenditure",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: expenseArray,
      },
    ],
  };

  return (
    <div>
      <div
        className="drop-down"
        style={{ flexDirection: "column", display: "flex" }}
      >
        <SelectDropdown
          dropdowns={months}
          stateUpdater={setListMonth}
          dropDownparam={"name"}
        />
      </div>

      <Line data={dataSet} />
    </div>
  );
};
