import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React from "react";
import TypingAnimation from "./magicui/typing-animation";

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
  return (
    <div className="flex space-x-4 border w-full p-4 rounded-md ">
      <div
        className={`p-3 rounded-md  bg-opacity-25 ${
          color === "red" ? "text-red-600 bg-red-500" : ""
        }
        ${color === "green" ? "text-green-600 bg-green-500" : ""}
        ${color === "blue" ? "text-blue-600 bg-blue-500" : ""}


        `}
      >
        {icon === "up" && <TrendingUp size={24} />}
        {icon === "down" && <TrendingDown size={24} />}
        {icon === "wallet" && <Wallet size={24} />}
      </div>
      <div>
        <div className="text-xl font-semibold">{title}</div>
        {currency === "INR" && (
          <div className="flex space-x-1">
            ₹{<TypingAnimation text={`${value}`} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default OverviewBoxes;
