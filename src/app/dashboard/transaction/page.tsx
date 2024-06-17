import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import TransactionsTable from "@/components/transaction table";
import { auth } from "@/auth";
import { Currencies } from "@/lib/currencies";
import prisma from "@/lib/db";

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
    <div>
      <div className="md:max-w-[90vw] w-[90vw]   mx-auto">
        <div className="flex md:flex-row flex-wrap flex-row space-y-3 pb-7 md:space-y-0 items-center justify-between border-b border-primary/10 ">
          <div className="md:text-3xl text-xl font-bold">
            Transactions history ⏰
          </div>
          <div className="flex space-x-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  <span className="font-semibold">Open</span>{" "}
                  <ArrowDown size={18} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <TransactionsTable currenctCurrencySymbol={currentCurrecy?.symbol!} />
    </div>
  );
}

export default page;
