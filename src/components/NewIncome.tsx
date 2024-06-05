"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CategoryCombobox } from "./CategoryCombobox";

function NewIncome() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger onClick={() => setOpen(!open)}>
          <button className="bg-green-900 border text-sm md:text-lg  text-white px-3 py-1 font-semibold border-green-400 rounded-md">
            New Income 🤑
          </button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Create a <span className="text-pink-600">new</span> income
              transaction 💸
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description:</Label>
            <Input
              name="description"
              className="w-[90%] md:w-full"
              placeholder="House Rent"
            />
            <p className="text-sm  text-primary/50">
              Transaction description (optional)
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="amount">Amount:</Label>
            <Input
              name="amount"
              className="w-[90%] md:w-full"
              placeholder="100"
            />
            <p className="text-sm text-primary/50">
              Transaction amount (optional)
            </p>
          </div>
          <div className="flex items-center justify-between w-[90%] md:w-full gap-4">
            <div className="w-[50%]">
              <CategoryCombobox />
              <p className="text-xs text-primary/40">
                Select a category for this transaction
              </p>
            </div>
            <div className="w-[50%] h-full ">
              <IncomeDatePicker />
              <p className="text-xs text-primary/40">Select a date for this</p>
            </div>
          </div>
          <div className="flex justify-end w-[90%] md:w-full  gap-4">
            <Button variant={"secondary"} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant={"default"}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewIncome;

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function IncomeDatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <p className="text-sm mb-2">Select Date:</p>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant={"outline"}
          className={cn(
            "md:w-[12vw] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
