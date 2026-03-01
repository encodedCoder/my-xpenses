"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import TopHeader from "@/components/mobile/TopHeader";
import BottomNav from "@/components/mobile/BottomNav";
import BottomSheet from "@/components/mobile/BottomSheet";
import ExpenseForm from "@/components/mobile/ExpenseForm";
import DashboardView from "@/components/views/DashboardView";
import AnalyticsView from "@/components/views/AnalyticsView";
import ProfileView from "@/components/views/ProfileView";
import { ExpenseSchemaType } from "@/lib/validations";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "@/actions/expense";
import { IExpense, ExpenseFilters, ExpenseType } from "@/types";
import { AnimatePresence } from "framer-motion";

export default function AppShell() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Tab State
  const [activeTab, setActiveTab] = useState("home");

  // Filter & Data State
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [allYearExpenses, setAllYearExpenses] = useState<IExpense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({ sort: "latest" });
  
  // UI State
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Stats Logic
  const stats = useMemo(() => {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const uniqueMonths = new Set(expenses.map(e => {
        const d = new Date(e.date);
        return `${d.getFullYear()}-${d.getMonth()}`;
    }));
    return {
        total,
        count: expenses.length,
        months: uniqueMonths.size || 1
    };
  }, [expenses]);

  const fetchExpenses = useCallback(async () => {
    setIsLoading(true);
    try {
      const startDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
      const lastDay = new Date(currentYear, currentMonth, 0).getDate();
      const endDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

      const [monthResult, yearResult] = await Promise.all([
        getExpenses({
            ...filters,
            startDate: filters.startDate || startDate,
            endDate: filters.endDate || endDate,
          }),
        getExpenses({
            startDate: `${currentYear}-01-01`,
            endDate: `${currentYear}-12-31`,
        })
      ]);

      if (monthResult.success && monthResult.expenses) {
        setExpenses(monthResult.expenses);
      }
      if (yearResult.success && yearResult.expenses) {
        setAllYearExpenses(yearResult.expenses);
      }
    } catch {
      toast.error("Failed to fetch expenses");
    } finally {
      setIsLoading(false);
    }
  }, [currentMonth, currentYear, filters]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchExpenses();
    }
  }, [status, fetchExpenses]);

  const handleSubmit = async (data: ExpenseSchemaType) => {
    setIsSubmitting(true);
    try {
      if (editingExpense) {
        const result = await updateExpense(editingExpense._id, data);
        if (result.success) {
          toast.success("Expense updated!");
          setEditingExpense(null);
        } else {
          toast.error(result.error || "Failed to update");
        }
      } else {
        const result = await createExpense(data);
        if (result.success) {
          toast.success("Expense added!");
        } else {
          toast.error(result.error || "Failed to add");
        }
      }
      setIsSheetOpen(false);
      fetchExpenses();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteExpense(id);
      if (result.success) {
        setExpenses((prev) => prev.filter((e) => e._id !== id));
        toast.success("Expense deleted!");
      } else {
        toast.error(result.error || "Failed to delete");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDuplicate = async (expense: IExpense) => {
    try {
      const duplicateData = {
        item: `${expense.item} (copy)`,
        type: expense.type,
        mode: expense.mode,
        amount: expense.amount,
        date: new Date(expense.date).toISOString().split("T")[0],
        notes: expense.notes || "",
      };
      const result = await createExpense(duplicateData);
      if (result.success) {
        toast.success("Expense duplicated!");
        fetchExpenses();
      } else {
        toast.error(result.error || "Failed to duplicate");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh text-white">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-surface-950 text-white selection:bg-primary-500/30">
      {/* Desktop sidebar offset */}
      <div className="lg:ml-64">
        {/* Top Header persist across Home/Analytics */}
        {(activeTab === "home" || activeTab === "analytics") && (
            <TopHeader
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthChange={(m, y) => {
                setCurrentMonth(m);
                setCurrentYear(y);
              }}
            />
        )}

        {/* Dynamic View Content */}
        <main className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
                <DashboardView
                  key="home"
                  expenses={expenses}
                  filters={filters}
                  setFilters={setFilters}
                  isLoading={isLoading}
                  onEdit={(e) => {
                    setEditingExpense(e);
                    setIsSheetOpen(true);
                  }}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                />
            )}

            {activeTab === "analytics" && (
                <AnalyticsView
                  key="analytics"
                  allExpenses={allYearExpenses}
                  monthExpenses={expenses}
                  currentYear={currentYear}
                  setCurrentYear={setCurrentYear}
                  isLoading={isLoading}
                />
            )}

            {activeTab === "profile" && (
                <ProfileView
                  key="profile"
                  session={session}
                  stats={stats}
                  onSignOut={() => signOut({ callbackUrl: "/login" })}
                />
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Persistence overlay components */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => {
          setEditingExpense(null);
          setIsSheetOpen(true);
        }}
      />

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => {
          setIsSheetOpen(false);
          setEditingExpense(null);
        }}
        title={editingExpense ? "Edit Expense" : "Add Expense"}
      >
        <ExpenseForm
          key={editingExpense?._id || "new"}
          onSubmit={handleSubmit}
          defaultValues={editingExpense || undefined}
          isLoading={isSubmitting}
        />
      </BottomSheet>
    </div>
  );
}
