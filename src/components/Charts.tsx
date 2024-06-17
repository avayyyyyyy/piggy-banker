"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
import React from "react";

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

export interface Transaction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  description: string;
  date: Date;
  type: string;
  category: string;
  categoryIcon: string;
  userId: string | null;
}

export interface AggregatedCategory {
  category: string;
  categoryIcon: string;
  amount: number;
}

interface BarChartProps {
  topIncome: AggregatedCategory[];
  topExpenses: AggregatedCategory[];
}

const BarChart: React.FC<BarChartProps> = ({ topIncome, topExpenses }) => {
  const allCategories = Array.from(
    new Set([
      ...topIncome.map((item) => item.category),
      ...topExpenses.map((item) => item.category),
    ])
  );
  const incomeMap = new Map(
    topIncome.map((item) => [item.category, item.amount])
  );
  const expenseMap = new Map(
    topExpenses.map((item) => [item.category, item.amount])
  );

  const incomeData = allCategories.map(
    (category) => incomeMap.get(category) || 0
  );
  const expenseData = allCategories.map(
    (category) => expenseMap.get(category) || 0
  );

  const data = {
    labels: allCategories,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(33, 197, 93, 0.2)",
        borderColor: "rgba(33, 197, 99, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-fit mb-20">
      <h2>Income and Expense Overview</h2>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
