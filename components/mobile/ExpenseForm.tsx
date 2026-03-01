"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema, ExpenseSchemaType } from "@/lib/validations";
import { IExpense, ExpenseType, PaymentMode } from "@/types";
import { Loader2, ChevronDown } from "lucide-react";

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

interface ExpenseFormProps {
  onSubmit: (data: ExpenseSchemaType) => Promise<void>;
  defaultValues?: IExpense;
  isLoading?: boolean;
}

export default function ExpenseForm({ onSubmit, defaultValues, isLoading }: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExpenseSchemaType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      item: defaultValues?.item || "",
      type: defaultValues?.type || "Food",
      mode: defaultValues?.mode || "Online",
      amount: defaultValues?.amount || (undefined as unknown as number),
      date: defaultValues?.date
        ? new Date(defaultValues.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      notes: defaultValues?.notes || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pb-6">
      {/* Item */}
      <div>
        <label className="block text-sm font-medium text-surface-300 mb-2">
          Item Name
        </label>
        <input
          {...register("item")}
          placeholder="e.g., Lunch at cafe"
          className="input-field text-base"
          autoComplete="off"
        />
        {errors.item && (
          <p className="text-red-400 text-xs mt-1.5">{errors.item.message}</p>
        )}
      </div>

      {/* Category + Payment Mode row */}
      <div className="sm:flex sm:gap-4">
        {/* Type */}
        <div className="sm:flex-1">
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Category
          </label>
          <div className="relative">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="input-field py-3 text-base appearance-none pr-10 cursor-pointer bg-surface-800"
                >
                  {EXPENSE_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-surface-900 border-none outline-none">
                      {type}
                    </option>
                  ))}
                </select>
              )}
            />
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500 pointer-events-none" />
          </div>
          {errors.type && (
            <p className="text-red-400 text-xs mt-1.5">{errors.type.message}</p>
          )}
        </div>

        {/* Mode */}
        <div className="mt-5 sm:mt-0 sm:flex-1">
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Payment Mode
          </label>
          <div className="relative">
            <Controller
              name="mode"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="input-field py-3 text-base appearance-none pr-10 cursor-pointer bg-surface-800"
                >
                  {PAYMENT_MODES.map((mode) => (
                    <option key={mode} value={mode} className="bg-surface-900 border-none outline-none">
                      {mode}
                    </option>
                  ))}
                </select>
              )}
            />
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500 pointer-events-none" />
          </div>
          {errors.mode && (
            <p className="text-red-400 text-xs mt-1.5">{errors.mode.message}</p>
          )}
        </div>
      </div>

      {/* Amount + Date row on desktop */}
      <div className="sm:flex sm:gap-4">
        {/* Amount */}
        <div className="sm:flex-1">
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Amount (₹)
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="0.00"
            className="input-field text-xl font-bold"
            inputMode="decimal"
          />
          {errors.amount && (
            <p className="text-red-400 text-xs mt-1.5">{errors.amount.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="mt-5 sm:mt-0 sm:flex-1">
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Date
          </label>
          <input
            {...register("date")}
            type="date"
            className="input-field text-base"
          />
          {errors.date && (
            <p className="text-red-400 text-xs mt-1.5">{errors.date.message}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-surface-300 mb-2">
          Notes <span className="text-surface-500 font-normal">(optional)</span>
        </label>
        <textarea
          {...register("notes")}
          placeholder="Add any additional notes..."
          rows={1}
          className="input-field text-base resize-none"
        />
        {errors.notes && (
          <p className="text-red-400 text-xs mt-1.5">{errors.notes.message}</p>
        )}
      </div>

      {/* Submit — always visible with extra spacing */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary text-center flex items-center justify-center gap-2 py-4 text-base"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            defaultValues ? "Update Expense" : "Add Expense"
          )}
        </button>
      </div>
    </form>
  );
}
