"use client";

import { motion } from "framer-motion";
import { IndianRupee, Receipt, TrendingUp, Tags } from "lucide-react";
import { MonthlySummary, ExpenseType } from "@/types";

const TYPE_COLORS: Record<ExpenseType, string> = {
  Food: "text-orange-400",
  Travel: "text-blue-400",
  Electronics: "text-purple-400",
  SIP: "text-green-400",
  Other: "text-surface-400",
};

interface SummaryCardsProps {
  summary: MonthlySummary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Spent",
      value: `₹${summary.totalExpenses.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      gradient: "from-primary-500/20 to-primary-600/10",
      iconColor: "text-primary-400",
      borderColor: "border-primary-500/20",
    },
    {
      title: "Transactions",
      value: summary.transactionCount.toString(),
      icon: Receipt,
      gradient: "from-accent-500/20 to-accent-600/10",
      iconColor: "text-accent-400",
      borderColor: "border-accent-500/20",
    },
    {
      title: "Highest",
      value: `₹${summary.highestExpense.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      gradient: "from-rose-500/20 to-rose-600/10",
      iconColor: "text-rose-400",
      borderColor: "border-rose-500/20",
    },
  ];

  const topCategories = Object.entries(summary.categoryBreakdown)
    .filter(([, value]) => value > 0)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="px-4 sm:px-6 py-4">
      {/* Mobile: horizontal scroll | Desktop: grid */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex-shrink-0 w-[155px] sm:w-auto glass-card p-4 sm:p-5 bg-gradient-to-br ${card.gradient} border ${card.borderColor}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-surface-800/80 flex items-center justify-center">
                <card.icon className={`w-4.5 h-4.5 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-surface-400 uppercase tracking-wider font-medium">{card.title}</p>
            <p className="text-lg sm:text-xl font-bold text-white mt-1">{card.value}</p>
          </motion.div>
        ))}

        {/* Category card */}
        {topCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0 w-[180px] sm:w-auto glass-card p-4 sm:p-5 bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-500/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-surface-800/80 flex items-center justify-center">
                <Tags className="w-4 h-4 text-violet-400" />
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-surface-400 uppercase tracking-wider font-medium mb-2">Categories</p>
            <div className="space-y-2">
              {topCategories.slice(0, 3).map(([type, amount]) => (
                <div key={type} className="flex items-center justify-between text-xs sm:text-sm">
                  <span className={TYPE_COLORS[type as ExpenseType]}>{type}</span>
                  <span className="text-surface-300 font-medium">₹{amount.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
