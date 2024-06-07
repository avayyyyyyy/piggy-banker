import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React from "react";
import TextTicker from "@/components/Custom/typing-ticker";
import { Currencies } from "@/lib/currencies";

async function OverviewBoxes({
  color,
  title,
  value,
  icon,
  currency,
}: {
  color: string;
  title: string;
  value: number;
  icon: string;
  currency: string;
}) {
  const iconss = Currencies.filter((e) => e.value === currency).map(
    (e) => e.symbol
  );

  return (
    <div className="flex space-x-4 border w-full p-4 rounded-md ">
      <div
        className={` rounded-md flex justify-center items-center p-4  bg-opacity-25 ${
          color === "red" ? "text-red-600 bg-red-900" : ""
        }
        ${color === "green" ? "text-green-600 bg-green-900" : ""}
        ${color === "blue" ? "text-blue-600 bg-blue-900" : ""}
        `}
      >
        {icon === "up" && <TrendingUp size={28} />}
        {icon === "down" && <TrendingDown size={28} />}
        {icon === "wallet" && <Wallet size={28} />}
      </div>
      <div>
        <div className="text-xl text-primary/50">{title}</div>
        {currency && (
          <div className="flex text-2xl text-primary font-medium  space-x-1">
            {iconss}
            {value === 0 ? <div>0.00</div> : <TextTicker value={value} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default OverviewBoxes;
