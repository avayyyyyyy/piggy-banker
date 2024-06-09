import { auth } from "@/auth";
import ManageCurrency from "@/components/ManageCurrency";
import { Button } from "@/components/ui/button";
import { Currencies } from "@/lib/currencies";
import prisma from "@/lib/db";
import { PlusSquare, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

async function page() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  const currentCurrecy = Currencies.find((e) => {
    return e.value == user?.currency;
  });

  return (
    <div className="md:w-[80vw] w-[90vw]   mx-auto">
      <div className="flex md:flex-row flex-wrap flex-row space-y-3 pb-7 md:space-y-0 items-center justify-between border-b border-primary/10 ">
        <div className="md:text-3xl text-xl font-bold">Manage Account 💛</div>
      </div>
      <div className="p-4 border rounded-lg space-y-2">
        <div className="text-3xl font-semibold">Currency</div>
        <div className="text-sm text-primary/40">Change your Currency</div>
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
            <div className="rounded-md flex bg-green-500 justify-center items-center p-4  bg-opacity-25 50">
              <TrendingUp className="text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold">Incomes categories</div>
              <div className="text-sm text-primary/50">Sorted by name</div>
            </div>
          </div>
          <div>
            <Button className="flex gap-2 items-center">
              <PlusSquare />
              Create Category
            </Button>
          </div>
        </div>
        <div className="border p-4 mt-4 rounded-lg">
          <div className="flex flex-col justify-center items-center min-h-28">
            <div>
              No <span className="text-green-500">income</span> categories yet
            </div>
            <div className="text-sm text-primary/50">
              Create one to get started
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 border p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="rounded-md flex bg-red-500 justify-center items-center p-4  bg-opacity-25 50">
              <TrendingDown className="text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold">Expense categories</div>
              <div className="text-sm text-primary/50">Sorted by name</div>
            </div>
          </div>
          <div>
            <Button className="flex gap-2 items-center">
              <PlusSquare />
              Create Category
            </Button>
          </div>
        </div>
        <div className="border p-4 mt-4 rounded-lg">
          <div className="flex flex-col justify-center items-center min-h-28">
            <div>
              No <span className="text-red-500">expense</span> categories yet
            </div>
            <div className="text-sm text-primary/50">
              Create one to get started
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
