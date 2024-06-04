"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveCurrency } from "@/Actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CurrencyForm() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const router = useRouter();
  const handleSave = () => {
    const isSaved = saveCurrency(selectedCurrency).then((e) => {
      if (e.status === "ok") {
        toast.success("Currency Updated Successfully!");
        router.push("/dashboard");
      }
    });
  };

  return (
    <div>
      <Select onValueChange={setSelectedCurrency}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="inr">Indian Rupees (INR)</SelectItem>
            <SelectItem value="usd">US Dollar (USD)</SelectItem>
            <SelectItem value="eur">Euro (EUR)</SelectItem>
            <SelectItem value="gbp">British Pound (GBP)</SelectItem>
            <SelectItem value="cad">Canadian Dollar (CAD)</SelectItem>
            <SelectItem value="aud">Australian Dollar (AUD)</SelectItem>
            <SelectItem value="chf">Swiss Franc (CHF)</SelectItem>
            <SelectItem value="nzd">New Zealand Dollar (NZD)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-8 flex justify-end">
        <Button className="w-full" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default CurrencyForm;
