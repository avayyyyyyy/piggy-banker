"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Currencies } from "@/lib/currencies";
import { useMutation } from "@tanstack/react-query";
import { saveCurrency } from "../lib/actions";
import { toast } from "sonner";

function ManageCurrency({
  value,
  symbol,
}: {
  value: string | undefined;
  symbol: string | undefined;
}) {
  const [current, setCurrent] = useState({ value, symbol });

  const toShowCurrency = Currencies.filter((e) => e.value !== current.value);

  const saveCurrencyFnc = useMutation({
    mutationKey: ["saveCurrency"],
    mutationFn: async () => {
      await saveCurrency(current.value!);
    },
    onSuccess: () => {
      toast.success("Currency Updated Successfully! 🎉");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCurrencyChange = async (currency: {
    value: string;
    symbol: string;
  }) => {
    setCurrent(currency);
    saveCurrencyFnc.mutate();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} className="w-full flex justify-start">
            {current.symbol} {current.value}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="flex flex-col justify-start w-full">
          {toShowCurrency.map((e) => (
            <DropdownMenuItem
              key={e.label}
              className="w-[77vw] flex"
              onClick={() => handleCurrencyChange(e)}
            >
              {e.symbol} {e.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ManageCurrency;
