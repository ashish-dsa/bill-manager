export interface ITransaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: Date;
  selected?: boolean;
}
