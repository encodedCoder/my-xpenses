"use server";

import connectDB from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { getCurrentUserId } from "@/lib/auth";
import { expenseSchema } from "@/lib/validations";
import { ExpenseFilters, IExpense } from "@/types";
import { revalidatePath } from "next/cache";

export async function createExpense(data: unknown): Promise<{ success: boolean; expense?: IExpense; error?: string }> {
  try {
    const userId = await getCurrentUserId();
    const validated = expenseSchema.parse(data);

    await connectDB();

    const expense = await Expense.create({
      ...validated,
      userId,
      date: new Date(validated.date),
    });

    revalidatePath("/");
    return { success: true, expense: JSON.parse(JSON.stringify(expense)) };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create expense";
    return { success: false, error: message };
  }
}

export async function updateExpense(
  id: string,
  data: unknown
): Promise<{ success: boolean; expense?: IExpense; error?: string }> {
  try {
    const userId = await getCurrentUserId();
    const validated = expenseSchema.parse(data);

    await connectDB();

    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId },
      { ...validated, date: new Date(validated.date) },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return { success: false, error: "Expense not found" };
    }

    revalidatePath("/");
    return { success: true, expense: JSON.parse(JSON.stringify(expense)) };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update expense";
    return { success: false, error: message };
  }
}

export async function deleteExpense(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const userId = await getCurrentUserId();

    await connectDB();

    const expense = await Expense.findOneAndDelete({ _id: id, userId });

    if (!expense) {
      return { success: false, error: "Expense not found" };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete expense";
    return { success: false, error: message };
  }
}

export async function getExpenses(
  filters: ExpenseFilters = {}
): Promise<{ success: boolean; expenses?: IExpense[]; error?: string }> {
  try {
    const userId = await getCurrentUserId();

    await connectDB();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { userId };

    if (filters.type) {
      query.type = filters.type;
    }

    if (filters.mode) {
      query.mode = filters.mode;
    }

    if (filters.search) {
      query.item = { $regex: filters.search, $options: "i" };
    }

    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) {
        query.date.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.date.$lte = new Date(filters.endDate + "T23:59:59.999Z");
      }
    }

    let sortObj: Record<string, 1 | -1> = { date: -1 };
    switch (filters.sort) {
      case "oldest":
        sortObj = { date: 1 };
        break;
      case "highest":
        sortObj = { amount: -1 };
        break;
      case "lowest":
        sortObj = { amount: 1 };
        break;
      default:
        sortObj = { date: -1 };
    }

    const expenses = await Expense.find(query).sort(sortObj).lean();

    return {
      success: true,
      expenses: JSON.parse(JSON.stringify(expenses)),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch expenses";
    return { success: false, error: message };
  }
}

export async function getMonthlyExpenses(
  year: number,
  month: number
): Promise<{ success: boolean; expenses?: IExpense[]; error?: string }> {
  try {
    const userId = await getCurrentUserId();

    await connectDB();

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const expenses = await Expense.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    })
      .sort({ date: -1 })
      .lean();

    return {
      success: true,
      expenses: JSON.parse(JSON.stringify(expenses)),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch monthly expenses";
    return { success: false, error: message };
  }
}
