import { auth } from "@/auth";
import ManageCurrency from "@/components/ManageCurrency";
import { Currencies } from "@/lib/currencies";
import prisma from "@/lib/db";
import "./style.css";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import DeleteCategory from "@/components/DeleteCategory";
import NewExpenseManage from "@/components/ManageCreateIncomeCategory";
import NewIncomeManage from "@/components/ManageCreateExpenseCategory";

async function Page() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  const currentCurrecy = Currencies.find((e) => {
    return e.value == user?.currency;
  });

  const Categories = await prisma.category.findMany();
  const incomeCate = Categories.filter((e) => e.type === "income");
  const expenseCate = Categories.filter((e) => e.type === "expense");

  return (
    <div className="md:max-w-[90vw] w-[90vw]   mx-auto">
      <div className="flex md:flex-row flex-wrap flex-row space-y-3 pb-7 md:space-y-0 items-center justify-between border-b border-primary/10 ">
        <div className="md:text-3xl text-xl font-bold">Manage Account 🧳</div>
      </div>
      <div className="p-4 border rounded-lg space-y-2">
        <div className="md:text-3xl text-xl font-semibold">Currency</div>
        <div className="md:text-sm text-xs text-primary/40">
          Change your Currency
        </div>
        <div>
          <ManageCurrency
            symbol={currentCurrecy?.symbol}
            value={currentCurrecy?.value}
          />
        </div>
      </div>
      <div className="mt-10 border p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="rounded-md flex bg-green-500 justify-center items-center md:p-4 h-fit my-auto p-2  bg-opacity-25 50">
              <TrendingUp className="text-green-600" />
            </div>
            <div>
              <div className="md:text-2xl text-sm font-semibold">
                Incomes categories
              </div>
              <div className="md:text-sm text-xs text-primary/50">
                Sorted by name
              </div>
            </div>
          </div>
          <div>
            <NewExpenseManage />
          </div>
        </div>
        <div className="border p-4 mt-4 rounded-lg">
          <div className="flex justify-start space-x-4 overflow-scroll items-center ">
            {incomeCate && incomeCate.length > 0 ? (
              incomeCate.map((e) => (
                <DeleteCategory
                  icon={e.icon}
                  id={e.id}
                  name={e.name}
                  key={e.id}
                />
              ))
            ) : (
              <div className="flex flex-col min-h-28 w-full  justify-center items-center ">
                <div>
                  No <span className="text-green-500">income</span> categories
                  yet
                </div>
                <div className="text-sm text-primary/50">
                  Create one to get started
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 border p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="rounded-md flex bg-red-500 justify-center items-center md:p-4 h-fit my-auto p-2  bg-opacity-25 50">
              <TrendingDown className="text-red-600" />
            </div>
            <div>
              <div className="md:text-2xl text-sm font-semibold">
                Expense categories
              </div>
              <div className="md:text-sm text-xs text-primary/50">
                Sorted by name
              </div>
            </div>
          </div>
          <div>
            <NewIncomeManage />
          </div>
        </div>
        <div className="border p-4 mt-4 rounded-lg">
          <div className="flex justify-start space-x-4 overflow-scroll  items-center ">
            {expenseCate && expenseCate.length > 0 ? (
              expenseCate.map((e) => (
                <DeleteCategory
                  icon={e.icon}
                  id={e.id}
                  name={e.name}
                  key={e.id}
                />
              ))
            ) : (
              <div className="flex flex-col min-h-28 w-full justify-center items-center ">
                <div>
                  No <span className="text-red-500">expense</span> categories
                  yet
                </div>
                <div className="text-sm text-primary/50">
                  Create one to get started
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
