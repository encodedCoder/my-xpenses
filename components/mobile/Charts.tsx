"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  ChartOptions,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { IExpense, ExpenseType } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const TYPE_COLORS: Record<ExpenseType, string> = {
  Food: "#fb923c",
  Electronics: "#a78bfa",
  Clothes: "#fbbf24",
  Subscription: "#f87171",
  SIP: "#34d399",
  Stocks: "#10b981",
  Travel: "#60a5fa",
  Fees: "#818cf8",
  "Mobile Recharge": "#f472b6",
  Other: "#94a3b8",
  Medicine: "#2dd4bf",
  "Transfer to Others": "#94a3b8",
  Sports: "#a855f7",
};

interface ChartsProps {
  expenses: IExpense[];
  year: number;
}

export function MonthlyBarChart({ expenses, year }: ChartsProps) {
  const monthlyData = Array(12).fill(0);
  expenses.forEach((exp) => {
    const expDate = new Date(exp.date);
    if (expDate.getFullYear() === year) {
      monthlyData[expDate.getMonth()] += exp.amount;
    }
  });

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Spending",
        data: monthlyData,
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f1f5f9",
        bodyColor: "#cbd5e1",
        borderColor: "#334155",
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b" },
      },
      y: {
        grid: { color: "rgba(51, 65, 85, 0.3)" },
        ticks: { color: "#64748b" },
      },
    },
  };

  return (
    <div className="h-[250px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export function CategoryPieChart({ expenses }: { expenses: IExpense[] }) {
  const categoryData: Record<string, number> = {};
  expenses.forEach((exp) => {
    categoryData[exp.type] = (categoryData[exp.type] || 0) + exp.amount;
  });

  const labels = Object.keys(categoryData);
  const values = Object.values(categoryData);
  const colors = labels.map((l) => TYPE_COLORS[l as ExpenseType] || "#94a3b8");

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.map((c) => c + "40"),
        borderColor: colors,
        borderWidth: 2,
        spacing: 4,
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#94a3b8",
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f1f5f9",
        bodyColor: "#cbd5e1",
        borderColor: "#334155",
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
      },
    },
  };

  if (labels.length === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center text-surface-500 text-sm">
        No data available
      </div>
    );
  }

  return (
    <div className="h-[280px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export function ExpenseTrendChart({ expenses, year }: ChartsProps) {
  const monthlyData = Array(12).fill(0);

  expenses.forEach((exp) => {
    const expDate = new Date(exp.date);
    if (expDate.getFullYear() === year) {
      monthlyData[expDate.getMonth()] += exp.amount;
    }
  });

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Spending Trend",
        data: monthlyData,
        borderColor: "rgba(20, 184, 166, 1)",
        backgroundColor: "rgba(20, 184, 166, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgba(20, 184, 166, 1)",
        pointBorderColor: "#0f172a",
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f1f5f9",
        bodyColor: "#cbd5e1",
        borderColor: "#334155",
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b" },
      },
      y: {
        grid: { color: "rgba(51, 65, 85, 0.3)" },
        ticks: { color: "#64748b" },
      },
    },
  };

  return (
    <div className="h-[250px]">
      <Line data={data} options={options} />
    </div>
  );
}
