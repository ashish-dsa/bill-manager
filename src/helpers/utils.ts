import { IDailyExpense } from "../models/IDailyExpense";
import { IMonthlyExpense } from "../models/IMonthlyExpense";

export const monthNameToNumber = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

export const monthNumberToName = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export const dayNumberToName = {
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday",
  "0": "Sunday",
};

export const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export const computeCalendar = () => {
  const yearlyExpense = new Map<number, IMonthlyExpense>();
  for (let i = 1; i <= 12; i++) {
    let monthlyExpense: IMonthlyExpense = {
      amount: 0,
      monthlyExpense: new Map<number, IDailyExpense>(),
      name: "",
    };
    const monthsDays = daysInMonth(i, 2020);
    for (let j = 1; j <= monthsDays; j++) {
      let currentDay = new Date("2020-" + i + "-" + j);
      let dailyExpense: IDailyExpense = {
        amount: 0,
        dayName: dayNumberToName[currentDay.getDay()],
        dayNumber: currentDay.getDay(),
      };
      monthlyExpense.amount += dailyExpense.amount;
      monthlyExpense.monthlyExpense.set(j, dailyExpense);
    }
    let currentDay = new Date("2020-" + i + "-" + 1);
    let currentMonth = (currentDay.getMonth() + 1).toString();
    if (i < 10) {
      currentMonth = "0" + currentMonth;
    }
    monthlyExpense.name = monthNumberToName[currentMonth];
    yearlyExpense.set(i, monthlyExpense);
  }
  return yearlyExpense;
};

export const months = [
  { name: "January" },
  { name: "February" },
  { name: "March" },
  { name: "April" },
  { name: "May" },
  { name: "June" },
  { name: "July" },
  { name: "August" },
  { name: "September" },
  { name: "October" },
  { name: "November" },
  { name: "December" },
];
