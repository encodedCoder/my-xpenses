"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, X, ChevronDown } from "lucide-react";
import { ExpenseFilters, ExpenseType, PaymentMode, SortOption } from "@/types";

const EXPENSE_TYPES: ExpenseType[] = [
  "Food",
  "Electronics",
  "Clothes",
  "Subscription",
  "SIP",
  "Stocks",
  "Travel",
  "Fees",
  "Mobile Recharge",
  "Other",
  "Medicine",
  "Transfer to Others",
  "Sports",
];
const PAYMENT_MODES: PaymentMode[] = ["Online", "Cash", "Card"];
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "highest", label: "Highest Amount" },
  { value: "lowest", label: "Lowest Amount" },
];

interface FilterDrawerProps {
  filters: ExpenseFilters;
  onFiltersChange: (filters: ExpenseFilters) => void;
}

export default function FilterDrawer({ filters, onFiltersChange }: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = [
    filters.type,
    filters.mode,
    filters.search,
    filters.startDate,
    filters.endDate,
  ].filter(Boolean).length;

  const updateFilter = (key: keyof ExpenseFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({ sort: "latest" });
  };

  return (
    <div className="px-4 sm:px-6 py-2">
      {/* Search + Filter Button */}
      <div className="flex gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-surface-500" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={filters.search || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="input-field pl-11 py-3 text-sm sm:text-base"
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-3 rounded-xl border transition-colors duration-200 ${
            isOpen || activeFilterCount > 0
              ? "bg-primary-500/10 border-primary-500/30 text-primary-400"
              : "bg-surface-800 border-surface-700/50 text-surface-400 hover:text-surface-200"
          }`}
        >
          <Filter className="w-5 h-5" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-4 sm:p-5 mt-3 space-y-4 sm:space-y-5">
              {/* Desktop: row layout for sort + dates | Mobile: stacked */}
              <div className="sm:flex sm:gap-4">
                {/* Sort */}
                <div className="sm:flex-1">
                  <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-2 block">
                    Sort By
                  </label>
                  <div className="relative">
                    <select
                      value={filters.sort || "latest"}
                      onChange={(e) => updateFilter("sort", e.target.value)}
                      className="input-field py-2.5 text-sm appearance-none pr-8"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none" />
                  </div>
                </div>

                {/* Date range */}
                <div className="grid grid-cols-2 gap-3 mt-4 sm:mt-0 sm:flex-1">
                  <div>
                    <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-2 block">
                      From
                    </label>
                    <input
                      type="date"
                      value={filters.startDate || ""}
                      onChange={(e) => updateFilter("startDate", e.target.value)}
                      className="input-field py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-2 block">
                      To
                    </label>
                    <input
                      type="date"
                      value={filters.endDate || ""}
                      onChange={(e) => updateFilter("endDate", e.target.value)}
                      className="input-field py-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Type filter */}
              <div>
                <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-2 block">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateFilter("type", "")}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      !filters.type
                        ? "gradient-primary text-white"
                        : "bg-surface-800 text-surface-400 hover:text-surface-200"
                    }`}
                  >
                    All
                  </button>
                  {EXPENSE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => updateFilter("type", type)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        filters.type === type
                          ? "gradient-primary text-white"
                          : "bg-surface-800 text-surface-400 hover:text-surface-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode filter */}
              <div>
                <label className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-2 block">
                  Payment Mode
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateFilter("mode", "")}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      !filters.mode
                        ? "gradient-accent text-white"
                        : "bg-surface-800 text-surface-400 hover:text-surface-200"
                    }`}
                  >
                    All
                  </button>
                  {PAYMENT_MODES.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateFilter("mode", mode)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        filters.mode === mode
                          ? "gradient-accent text-white"
                          : "bg-surface-800 text-surface-400 hover:text-surface-200"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
