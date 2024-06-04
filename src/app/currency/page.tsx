import { auth } from "@/auth";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/db";
import React from "react";
import CurrencyForm from "./(comp)/CurrencyForm";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();

  const isCurrencyAvailable = await prisma.user.findFirst({
    where: {
      email: session?.user?.email!,
    },

    select: {
      currency: true,
    },
  });

  if (isCurrencyAvailable?.currency) {
    redirect("/dashboard");
  }

  return (
    <div className="flex  justify-center items-center h-screen">
      <main className="flex py-12 px-6 border w-fit ">
        <div className="container  mx-auto max-w-3xl">
          <div className="w-full flex justify-center mb-5">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Welcome,
            <span className="bg-gradient-to-br from-red-200 to-red-700 bg-clip-text md:text-3xl text-xl font-light leading-tight tracking-tighter text-transparent">
              {" "}
              {session?.user?.name?.split(" ")[0]}
            </span>{" "}
            👋🏻
          </h1>
          <p className="text-gray-500 mb-8">
            Please select your preferred currency.
          </p>
          <CurrencyForm />
        </div>
      </main>
    </div>
  );
}

export default page;
