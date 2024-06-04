import { auth } from "@/auth";
import IntroHeader from "@/components/IntroHeader";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowDownNarrowWide } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import DropDown from "./(Dash-Comp)/DropDown";
import OverviewBoxes from "@/components/OverviewBoxes";

async function page() {
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
          <OverviewBoxes color="red" icon="up" title="Income" value="0.00" />
          <OverviewBoxes
            color="green"
            icon="down"
            title="Outcome"
            value="0.00"
          />
          <OverviewBoxes
            color="blue"
            icon="wallet"
            title="Wallet"
            value="0.00"
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

export default page;
