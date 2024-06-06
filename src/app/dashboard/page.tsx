import { auth } from "@/auth";
import IntroHeader from "@/components/IntroHeader";
import { redirect } from "next/navigation";
import React from "react";
import DropDown from "./(Dash-Comp)/DropDown";
import OverviewBoxes from "@/components/OverviewBoxes";
import prisma from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/actions/actions";

async function Page() {
  const session = await auth();

  const isCurrencyAvailable = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },

    select: {
      currency: true,
    },
  });

  if (!isCurrencyAvailable?.currency) {
    redirect("/currency");
  }

  const currency = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    select: { currency: true },
  });

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user?.id,
    },
  });

  const incomes = transactions.filter((trans) => trans.type === "income");
  const expense = transactions.filter((trans) => trans.type === "expense");

  const totalIncome = incomes.reduce((acc, e) => acc + e.amount, 0);
  const totalExpense = expense.reduce((acc, e) => acc + e.amount, 0);
  const wallet = totalIncome - totalExpense;

  return (
    <div>
      <IntroHeader />
      <div>
        <div className="flex justify-between items-center mt-3">
          <div className="text-2xl font-bold">Overview</div>
          <div>
            <DropDown />
          </div>
        </div>
        <div className="flex md:flex-row flex-col  justify-between mt-4 gap-3">
          <OverviewBoxes
            currency={currency?.currency!}
            color="red"
            icon="up"
            title="Income"
            value={totalIncome}
          />
          <OverviewBoxes
            currency={currency?.currency!}
            color="green"
            icon="down"
            title="Outcome"
            value={totalExpense}
          />
          <OverviewBoxes
            currency={currency?.currency!}
            color="blue"
            icon="wallet"
            title="Wallet"
            value={wallet}
          />
        </div>
        <div className="flex flex-col md:flex-row  justify-between  gap-3 mt-3">
          <div className="border w-full p-3 rounded-md">
            <div className="text-2xl px-2  font-bold text-primary/40">
              Incomes by category
            </div>
            <div className=" flex justify-center items-center flex-col h-[30vh]">
              <div>No data for the selected period</div>
              <p className="text-sm text-primary/40 text-center">
                Try selecting a different period or try adding new incomes
              </p>
            </div>
          </div>
          <div className="border w-full p-3 rounded-md">
            <div className="text-2xl px-2  font-bold text-primary/40">
              Expenses by category
            </div>
            <div className=" flex justify-center items-center flex-col h-[30vh]">
              <div>No data for the selected period</div>
              <p className="text-sm text-primary/40 text-center">
                Try selecting a different period or try adding new expenses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
