import { auth } from "@/auth";
import React from "react";

async function IntroHeader() {
  const data = await auth();

  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-3 pb-7  md:space-y-0 items-center justify-between border-b border-primary/10 ">
        <div className="text-3xl font-bold">
          Hello, {data?.user?.name?.split(" ")[0]} 👋🏻
        </div>
        <div className="space-x-3">
          <button className="bg-green-900 border  text-white px-3 py-1 font-semibold border-green-400 rounded-md">
            New Income 🤑
          </button>
          <button className="bg-red-900 border  text-white px-3 py-1 font-semibold border-red-400 rounded-md">
            New Expense 😤
          </button>
        </div>
      </div>
    </div>
  );
}

export default IntroHeader;
