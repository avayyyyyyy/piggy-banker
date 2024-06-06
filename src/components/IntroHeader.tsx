import { auth } from "@/auth";
import React from "react";
import NewIncome from "./NewIncome";
import NewExpense from "./NewExpense";

async function IntroHeader() {
  const data = await auth();

  return (
    <div>
      <div className="flex flex-col flex-wrap md:flex-row space-y-3 pb-7  md:space-y-0 items-center justify-between border-b border-primary/10 ">
        <div className="md:text-3xl text-3xl font-bold">
          Hello, {data?.user?.name?.split(" ")[0]} 👋🏻
        </div>
        <div className="flex space-x-2">
          <NewIncome />
          <NewExpense />
        </div>
      </div>
    </div>
  );
}

export default IntroHeader;
