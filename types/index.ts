export type ExpenseType = 
  | "Food" 
  | "Electronics" 
  | "Clothes" 
  | "Subscription" 
  | "SIP" 
  | "Stocks" 
  | "Travel" 
  | "Fees" 
  | "Mobile Recharge" 
  | "Other" 
  | "Medicine" 
  | "Transfer to Others" 
  | "Sports";
export type PaymentMode = "Online" | "Cash" | "Card";
export type SortOption = "latest" | "oldest" | "highest" | "lowest";

export interface IExpense {
  _id: string;
  userId: string;
  item: string;
  type: ExpenseType;
  mode: PaymentMode;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  item: string;
  type: ExpenseType;
  mode: PaymentMode;
  amount: number;
  date: string;
}

export interface ExpenseFilters {
  search?: string;
  type?: ExpenseType | "";
  mode?: PaymentMode | "";
  startDate?: string;
  endDate?: string;
  sort?: SortOption;
}

export interface MonthlySummary {
  totalExpenses: number;
  transactionCount: number;
  highestExpense: number;
  categoryBreakdown: Record<ExpenseType, number>;
}
