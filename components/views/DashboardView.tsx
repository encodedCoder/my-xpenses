"use client";

import { motion } from "framer-motion";
import SummaryCards from "@/components/mobile/SummaryCards";
import ExpenseList from "@/components/mobile/ExpenseList";
import FilterDrawer from "@/components/mobile/FilterDrawer";
import { IExpense, ExpenseFilters, MonthlySummary, ExpenseType } from "@/types";

interface DashboardViewProps {
  expenses: IExpense[];
  filters: ExpenseFilters;
  setFilters: (f: ExpenseFilters) => void;
  isLoading: boolean;
  onEdit: (e: IExpense) => void;
  onDelete: (id: string) => void;
  onDuplicate: (e: IExpense) => void;
}

export default function DashboardView({
  expenses,
  filters,
  setFilters,
  isLoading,
  onEdit,
  onDelete,
  onDuplicate,
}: DashboardViewProps) {
  const summary: MonthlySummary = {
    totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0),
    transactionCount: expenses.length,
    highestExpense: expenses.length > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0,
    categoryBreakdown: expenses.reduce<Record<ExpenseType, number>>(
      (acc, e) => {
        acc[e.type] = (acc[e.type] || 0) + e.amount;
        return acc;
      },
      {
        Food: 0,
        Electronics: 0,
        Clothes: 0,
        Subscription: 0,
        SIP: 0,
        Stocks: 0,
        Travel: 0,
        Fees: 0,
        "Mobile Recharge": 0,
        Other: 0,
        Medicine: 0,
        "Transfer to Others": 0,
        Sports: 0,
      }
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <SummaryCards summary={summary} />
      <FilterDrawer filters={filters} onFiltersChange={setFilters} />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      )}
    </motion.div>
  );
}
