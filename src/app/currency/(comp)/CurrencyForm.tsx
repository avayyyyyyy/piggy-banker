"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveCurrency } from "../../../actions/actions";
import { toast } from "sonner";
import { Currencies } from "@/lib/currencies";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

function CurrencyForm() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveCurrencyFnc = useMutation({
    mutationKey: ["saveCurrency"],
    mutationFn: async () => {
      setLoading(true);
      await saveCurrency(selectedCurrency);
    },
    onSuccess: () => {
      toast.success("Currency Updated Successfully! 🎉");
      router.push("/dashboard");
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    saveCurrencyFnc.mutate();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Select onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            className="w-full"
            disabled={saveCurrencyFnc.isPending}
          >
            Save{" "}
            <span>
              {saveCurrencyFnc.isPending && (
                <Loader className="animate-spin ml-2" size={18} />
              )}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CurrencyForm;
