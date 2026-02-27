"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, CreditCard, Banknote, Smartphone, MoreVertical } from "lucide-react";
import { IExpense, ExpenseType, PaymentMode } from "@/types";
import { useState, useRef, useEffect } from "react";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

const TYPE_BADGE_CLASS: Record<ExpenseType, string> = {
  Food: "badge-food",
  Travel: "badge-travel",
  Electronics: "badge-electronics",
  SIP: "badge-sip",
  Other: "badge-other",
  Clothes: "badge-clothes",
  Subscription: "badge-subscription",
  Stocks: "badge-stocks",
  Fees: "badge-fees",
  "Mobile Recharge": "badge-mobile",
  Medicine: "badge-medicine",
  "Transfer to Others": "badge-transfer",
  Sports: "badge-sports",
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
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const ModeIcon = MODE_ICON[expense.mode];

  const formattedDate = new Date(expense.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(expense._id), 300);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Delete Expense?"
        message={`Are you sure you want to delete "${expense.item}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isDeleting ? 0 : 1, y: isDeleting ? -20 : 0, scale: isDeleting ? 0.95 : 1 }}
        transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
        className="glass-card p-4 sm:p-5 relative transition-transform duration-100"
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

          <div className="flex items-start gap-2">
            <div className="text-right">
              <p className="text-lg sm:text-xl font-bold text-white">
                ₹{expense.amount.toLocaleString("en-IN")}
              </p>
            </div>
            
            {/* Three Dots Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  showMenu ? "bg-surface-800 text-white" : "text-surface-500 hover:text-white"
                }`}
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute right-0 top-10 z-20 w-36 glass-card p-1.5 shadow-elevated border-surface-700/50"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                        onEdit(expense);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-surface-300 hover:bg-surface-800 hover:text-white rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-primary-400" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                        setShowConfirmDelete(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-surface-300 hover:bg-surface-800 hover:text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
