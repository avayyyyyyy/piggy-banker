"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getTransaction } from "../lib/actions";
import { Transaction } from "@prisma/client";
import DeleteTransactionEntry from "./DeleteTransactionEntry";

export default function TransactionDataTable({
  currenctCurrencySymbol,
}: {
  currenctCurrencySymbol: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedAmount, setSelectedAmount] = useState("all");

  const { data: transactionData } = useQuery({
    queryKey: ["Fetch table"],
    queryFn: async () => await getTransaction(),
    refetchOnMount: "always",
    refetchInterval: 10000,
  });

  const FetchCategories = useQuery({
    queryKey: ["FetchIncomeCategories"],
    queryFn: async () => await getAllCategories(),
    refetchOnMount: "always",
  });

  const filteredTransactionData =
    selectedCategory === "all"
      ? transactionData
      : transactionData?.filter(
          (transaction) => transaction.category === selectedCategory
        );
  const filteredByType =
    selectedType === "all"
      ? filteredTransactionData
      : filteredTransactionData?.filter(
          (transaction: Transaction) => transaction.type === selectedType
        );

  let filteredByAmount = filteredByType;
  if (selectedAmount === "aes") {
    filteredByAmount = filteredByType
      ?.slice()
      .sort((a, b) => a.amount - b.amount);
  } else if (selectedAmount === "des") {
    filteredByAmount = filteredByType
      ?.slice()
      .sort((a, b) => b.amount - a.amount);
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full max-w-screen mx-auto p-4 md:p-6">
      {transactionData && transactionData?.length > 0 ? (
        <div className="border rounded-lg overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {selectedCategory[0].toUpperCase()}
                        {selectedCategory.slice(1)}
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuRadioGroup
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <DropdownMenuRadioItem value="all">
                          All
                        </DropdownMenuRadioItem>
                        {FetchCategories.data?.map((e) => (
                          <DropdownMenuRadioItem key={e.id} value={e.name}>
                            {e.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {selectedType[0].toUpperCase()}
                        {selectedType.slice(1)}
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuRadioGroup
                        value={selectedType}
                        onValueChange={setSelectedType}
                      >
                        <DropdownMenuRadioItem value="all">
                          All
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="expense">
                          Expense
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="income">
                          Income
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {selectedAmount[0].toUpperCase()}
                        {selectedAmount.slice(1)}
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup
                        value={selectedAmount}
                        onValueChange={setSelectedAmount}
                      >
                        <DropdownMenuRadioItem value="all">
                          All
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="aes">
                          Ascending
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="des">
                          Descending
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead className="text-center">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredByAmount?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-center">
                    <span>
                      {transaction.category} {transaction.categoryIcon}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell
                    className={`text-center w-fit px-3 py-1 rounded-sm h-fit `}
                  >
                    <div
                      className={`text-center w-fit px-3 py-1 mx-auto rounded-sm h-fit  ${
                        transaction.type === "income"
                          ? "bg-green-700 bg-opacity-25 text-green-500"
                          : "bg-red-700 bg-opacity-25 text-red-500"
                      } `}
                    >
                      {transaction.type[0].toUpperCase()}
                      {transaction.type.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.type === "Expense"
                      ? `-${currenctCurrencySymbol}${Math.abs(
                          transaction.amount
                        ).toFixed(2)}`
                      : `${currenctCurrencySymbol}${transaction.amount.toFixed(
                          2
                        )}`}
                  </TableCell>

                  <TableCell className="text-center">
                    <DeleteTransactionEntry id={transaction.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center text-primary/50">No Transaction found.</div>
      )}
    </div>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
