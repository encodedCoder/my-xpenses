"use client";

import { AnimatePresence } from "framer-motion";
import { IExpense } from "@/types";
import ExpenseCard from "./ExpenseCard";
import { Receipt } from "lucide-react";

interface ExpenseListProps {
  expenses: IExpense[];
  onEdit: (expense: IExpense) => void;
  onDelete: (id: string) => void;
  onDuplicate: (expense: IExpense) => void;
}

export default function ExpenseList({ expenses, onEdit, onDelete, onDuplicate }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 rounded-2xl bg-surface-800/80 flex items-center justify-center mb-4">
          <Receipt className="w-10 h-10 text-surface-600" />
        </div>
        <p className="text-surface-400 text-base font-medium">No expenses found</p>
        <p className="text-surface-500 text-sm mt-1">Tap the + button to add your first expense</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-3 pb-28 lg:pb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">
          Recent Transactions
        </h2>
        <span className="text-xs text-surface-500">{expenses.length} items</span>
      </div>
      {/* Mobile: single column | Desktop: 2-col grid */}
      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        <AnimatePresence mode="popLayout">
          {expenses.map((expense, index) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
