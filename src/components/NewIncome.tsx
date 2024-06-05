"use client";
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

import React, { useState } from "react";

import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories, saveCategory, saveIncome } from "@/actions/actions";
import { toast } from "sonner";
import { ChevronDownIcon, Loader, PlusIcon } from "lucide-react";

function NewIncome() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({
    title: "",
    icon: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [date, setDate] = useState<Date | undefined>();
  const [amount, setAmount] = useState("");

  const { mutate: saveCategoryFnc, isPending: categoryLoading } = useMutation({
    mutationKey: ["SaveCategory"],
    mutationFn: async () => {
      await saveCategory(categoryInfo);
    },

    onSuccess: () => {
      toast.success("Category added successfully! 🎉");
      setCategoryOpen(false);
      FetchCategories.refetch();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  const FetchCategories = useQuery({
    queryKey: ["FetchCategories"],
    queryFn: async () => await getCategories(),
    refetchOnMount: "always",
  });

  function handleCategorySubmit(e: FormEvent) {
    e.preventDefault();
    saveCategoryFnc();
  }

  const saveIncomeFnc = useMutation({
    mutationKey: ["saveIncome"],
    mutationFn: async () => {
      console.log("Saving income with data:", {
        date,
        description,
        category: selectedCategory,
        price: amount,
      });
      await saveIncome({
        date,
        desc: description,
        category: selectedCategory,
        price: amount,
      });
    },
    onSuccess: () => {
      toast.success("Income successfully saved!");
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleSubmitIncome(e: FormEvent) {
    e.preventDefault();
    console.log("Submitting income form with state:", {
      date,
      description,
      selectedCategory,
      amount,
    });
    saveIncomeFnc.mutate();
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger asChild onClick={() => setOpen(!open)}>
          <button className="bg-green-900 border text-sm md:text-lg text-white px-3 py-1 font-semibold border-green-400 rounded-md">
            New Income 🤑
          </button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Create a <span className="text-green-600">new</span> income
              transaction 💸
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitIncome}>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Description:</Label>
              <Input
                name="description"
                required
                onChange={(e) => setDescription(e.target.value)}
                className="w-[90%] md:w-full"
                placeholder="House Rent"
              />
              <p className="text-sm text-primary/50">
                Transaction description (required)
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="amount">Amount:</Label>
              <Input
                required
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="w-[90%] md:w-full"
                placeholder="100"
              />
              <p className="text-sm text-primary/50">
                Transaction amount (required)
              </p>
            </div>
            <div className="flex items-center justify-between w-[90%] md:w-full gap-4">
              <div className="w-[50%]">
                <DropdownMenu>
                  <p className="text-sm mb-2">Select Category:</p>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="flex items-center justify-between w-full"
                      variant="outline"
                    >
                      <span>{selectedCategory}</span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[300px] p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Select
                        onValueChange={(e) => {
                          setSelectedCategory(e);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={selectedCategory}>
                            {selectedCategory}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="💡 Electronics">
                              💡 Electronics
                            </SelectItem>
                            {FetchCategories.data?.map((e) => (
                              <SelectItem
                                key={e.id}
                                value={`${e.icon}  ${e.name}`}
                              >
                                <div className="flex items-center justify-between w-full space-x-2">
                                  {e.icon} {e.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p className="font-medium">Add Category</p>
                      <Button
                        onClick={() => setCategoryOpen(true)}
                        size="icon"
                        variant="ghost"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <p className="text-xs text-primary/40">
                  Select a category for this transaction
                </p>
              </div>
              <div className="w-[50%] h-full">
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
                      onSelect={(e) => setDate(e)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-primary/40">
                  Select a date for this
                </p>
              </div>
            </div>
            <div className="flex justify-end w-[90%] md:w-full gap-4">
              <Button variant={"secondary"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saveIncomeFnc.isPending}
                variant={"default"}
              >
                Save{" "}
                {saveIncomeFnc.isPending && (
                  <Loader className="animate-spin ml-2" size={18} />
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={categoryOpen} onOpenChange={setCategoryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Enter the name and icon for the new category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCategorySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label className="text-right" htmlFor="categoryName">
                  Name
                </Label>
                <Input
                  placeholder="Salary"
                  onChange={(e) =>
                    setCategoryInfo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="col-span-3"
                  id="categoryName"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label className="text-right" htmlFor="categoryIcon">
                  Icon
                </Label>
                <Input
                  placeholder="💸"
                  onChange={(e) =>
                    setCategoryInfo((prev) => ({
                      ...prev,
                      icon: e.target.value,
                    }))
                  }
                  className="col-span-3"
                  id="categoryIcon"
                />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={categoryLoading} type="submit">
                Save{" "}
                {categoryLoading && (
                  <Loader className="animate-spin ml-2" size={18} />
                )}
              </Button>
              <div>
                <Button
                  onClick={() => setCategoryOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewIncome;