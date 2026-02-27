"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { MonthlyBarChart, CategoryPieChart, ExpenseTrendChart } from "@/components/mobile/Charts";
import { IExpense } from "@/types";

interface AnalyticsViewProps {
  allExpenses: IExpense[];
  monthExpenses: IExpense[];
  currentYear: number;
  setCurrentYear: (y: number) => void;
  isLoading: boolean;
}

export default function AnalyticsView({
  allExpenses,
  monthExpenses,
  currentYear,
  setCurrentYear,
  isLoading,
}: AnalyticsViewProps) {
  const totalYear = allExpenses.reduce((s, e) => s + e.amount, 0);
  const totalMonth = monthExpenses.reduce((s, e) => s + e.amount, 0);
  const avgMonth = totalYear / 12;

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 pb-28 lg:pb-8 space-y-6 pt-5"
    >
      {/* Analytics Header (Desktop/Tablet) */}
      <div className="hidden lg:flex items-center gap-3 mb-2">
        <BarChart3 className="w-6 h-6 text-primary-400" />
        <h2 className="text-2xl font-bold text-white">Full Analytics</h2>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-[10px] sm:text-xs text-surface-400 uppercase tracking-wider">This Month</p>
          <p className="text-sm sm:text-lg font-bold text-white mt-1">₹{totalMonth.toLocaleString("en-IN")}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-[10px] sm:text-xs text-surface-400 uppercase tracking-wider">Year Total</p>
          <p className="text-sm sm:text-lg font-bold text-white mt-1">₹{totalYear.toLocaleString("en-IN")}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-[10px] sm:text-xs text-surface-400 uppercase tracking-wider">Avg/Month</p>
          <p className="text-sm sm:text-lg font-bold text-white mt-1">₹{Math.round(avgMonth).toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <div className="glass-card p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">
            Monthly Spending
          </h3>
          <MonthlyBarChart expenses={allExpenses} year={currentYear} />
        </div>

        <div className="glass-card p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">
            Category Breakdown
          </h3>
          <CategoryPieChart expenses={monthExpenses} />
        </div>
      </div>

      <div className="glass-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">
          Spending Trend
        </h3>
        <ExpenseTrendChart expenses={allExpenses} year={currentYear} />
      </div>
    </motion.div>
  );
}
