"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2, CreditCard, Banknote, Smartphone } from "lucide-react";
import { IExpense, ExpenseType, PaymentMode } from "@/types";
import { useState } from "react";

const TYPE_BADGE_CLASS: Record<ExpenseType, string> = {
  Food: "badge-food",
  Travel: "badge-travel",
  Electronics: "badge-electronics",
  SIP: "badge-sip",
  Other: "badge-other",
};

const MODE_ICON: Record<PaymentMode, typeof CreditCard> = {
  Card: CreditCard,
  Cash: Banknote,
  Online: Smartphone,
};

interface ExpenseCardProps {
  expense: IExpense;
  index: number;
  onEdit: (expense: IExpense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseCard({ expense, index, onEdit, onDelete }: ExpenseCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const ModeIcon = MODE_ICON[expense.mode];

  const formattedDate = new Date(expense.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(expense._id), 300);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDeleting ? 0 : 1, y: isDeleting ? -20 : 0, scale: isDeleting ? 0.95 : 1 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
      className="glass-card p-4 sm:p-5 cursor-pointer active:scale-[0.98] transition-transform duration-100 hover:border-surface-600/50"
      onClick={() => setShowActions(!showActions)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-semibold text-white text-[15px] sm:text-base truncate">{expense.item}</h3>
            <span className={`badge ${TYPE_BADGE_CLASS[expense.type]} text-[11px] sm:text-xs`}>{expense.type}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-surface-400">
            <span className="flex items-center gap-1.5">
              <ModeIcon className="w-3.5 h-3.5" />
              {expense.mode}
            </span>
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-lg sm:text-xl font-bold text-white">
            ₹{expense.amount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Action buttons on tap/click */}
      {showActions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex gap-2 sm:gap-3 mt-3 pt-3 border-t border-surface-700/50"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(expense);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary-500/10 text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
