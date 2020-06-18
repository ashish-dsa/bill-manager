import { IDailyExpense } from "./IDailyExpense";

export interface IMonthlyExpense {
  monthlyExpense: Map<number, IDailyExpense>;
  amount: number;
  name: string;
}
