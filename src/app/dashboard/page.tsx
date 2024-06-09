import { auth } from "@/auth";
import IntroHeader from "@/components/IntroHeader";
import { redirect } from "next/navigation";
import React from "react";
import DropDown from "./(Dash-Comp)/DropDown";
import OverviewBoxes from "@/components/OverviewBoxes";
import prisma from "@/lib/db";
import { Currencies } from "@/lib/currencies";
import { Progress } from "@/components/ui/progress";

interface Transaction {
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

interface AggregatedCategory {
  category: string;
  categoryIcon: string;
  amount: number;
}

const aggregateAndSort = (
  transactions: Transaction[],
  type: string
): AggregatedCategory[] => {
  const aggregated = transactions
    .filter((trans) => trans.type === type)
    .reduce(
      (
        acc: Record<string, AggregatedCategory>,
        { category, amount, categoryIcon }
      ) => {
        if (!acc[category]) {
          acc[category] = { amount: 0, category, categoryIcon };
        }
        acc[category].amount += amount;
        return acc;
      },
      {}
    );

  return Object.values(aggregated)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
};

async function Page() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    select: { id: true, currency: true },
  });

  if (!user?.currency) {
    redirect("/currency");
  }

  const transactions: Transaction[] = await prisma.transaction.findMany({
    where: { userId: user.id },
  });

  const topIncome = aggregateAndSort(transactions, "income");
  const topExpenses = aggregateAndSort(transactions, "expense");

  const totalIncome = transactions
    .filter((trans) => trans.type === "income")
    .reduce((acc, e) => acc + e.amount, 0);
  const totalExpense = transactions
    .filter((trans) => trans.type === "expense")
    .reduce((acc, e) => acc + e.amount, 0);
  const wallet = totalIncome - totalExpense;

  return (
    <div>
      <IntroHeader />
      <div>
        <div className="flex justify-between items-center mt-3">
          <div className="text-2xl font-bold">Overview</div>
          <DropDown />
        </div>
        <div className="flex md:flex-row flex-col justify-between mt-4 gap-3">
          <OverviewBoxes
            currency={user.currency}
            color="green"
            icon="up"
            title="Income"
            value={totalIncome}
          />
          <OverviewBoxes
            currency={user.currency}
            color="red"
            icon="down"
            title="Expense"
            value={totalExpense}
          />
          <OverviewBoxes
            currency={user.currency}
            color="blue"
            icon="wallet"
            title="Wallet"
            value={wallet}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full gap-3 mt-3">
          <div className="border w-full p-4 rounded-md">
            <div className="text-2xl px-2 mb-1 font-semibold text-primary/40">
              Incomes by category
            </div>
            <div className="border-b border-primary/10 mb-5 md:my-3"></div>
            <div className="flex items-center w-full justify-start flex-col h-[30vh]">
              {topIncome.length > 0 ? (
                topIncome.map((e) => (
                  <CategoryItem
                    key={e.category}
                    icon={e.categoryIcon}
                    category={e.category}
                    currency={user.currency!}
                    amount={e.amount}
                    percentage={Math.floor((e.amount / totalIncome) * 100)}
                    isIncome={true}
                  />
                ))
              ) : (
                <div className="flex flex-col h-full justify-center items-center">
                  No data for the selected period
                  <p className="text-sm text-primary/40 text-center">
                    Try selecting a different period or try adding new incomes
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="border w-full h-fit p-4 rounded-md">
            <div className="text-2xl px-2 mb-1 font-semibold text-primary/40">
              Expenses by category
            </div>
            <div className="border-b border-primary/10 mb-5 md:my-3"></div>
            <div className="flex items-center w-full justify-start flex-col h-[30vh]">
              {topExpenses.length > 0 ? (
                topExpenses.map((e) => (
                  <CategoryItem
                    key={e.category}
                    icon={e.categoryIcon}
                    category={e.category}
                    currency={user.currency!}
                    amount={e.amount}
                    percentage={Math.floor((e.amount / totalIncome) * 100)}
                    isIncome={false}
                  />
                ))
              ) : (
                <div className="flex flex-col h-full justify-center items-center">
                  No data for the selected period
                  <p className="text-sm text-primary/40 text-center">
                    Try selecting a different period or try adding new expenses
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

interface CategoryItemProps {
  icon: string;
  category: string;
  currency: string;
  percentage: number;
  amount: number;
  isIncome: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  icon,
  category,
  currency,
  amount,
  percentage,
  isIncome,
}) => {
  const currencySymbol =
    Currencies.find((e) => e.value === currency)?.symbol || "";

  const compClassnames = isIncome ? `[&>*]:bg-green-500` : `[&>*]:bg-red-500`;

  return (
    <div className="w-full flex flex-col gap-y-1 mb-5">
      <div className="flex text-sm justify-between mx-2">
        <div>
          {icon} {category} ({percentage}%)
        </div>
        <div className="text-primary/60">
          {currencySymbol}
          {amount}
        </div>
      </div>
      <Progress className={compClassnames} value={percentage} />
    </div>
  );
};
