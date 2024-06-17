import { auth } from "@/auth";
import Logo from "@/components/Logo";
import prisma from "@/lib/db";
import React from "react";
import CurrencyForm from "./(comp)/CurrencyForm";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();

  const isCurrencyAvailable = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  if (isCurrencyAvailable?.currency) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-col  w-[85vw] mx-auto justify-center items-center h-screen">
      <main className="flex py-12 px-3 border w-fit ">
        <div className="container  mx-auto">
          <h1 className="text-2xl font-bold mb-2">
            Welcome,
            <span className="bg-gradient-to-br from-purple-400 via-orange-500  to-yellow-400 bg-clip-text  md:text-3xl text-xl font-light leading-tight tracking-tighter text-transparent">
              {" "}
              {session?.user?.name?.split(" ")[0]}
            </span>{" "}
            👋🏻
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            Please select your preferred currency.
          </p>
          <CurrencyForm />
        </div>
      </main>
      <div className="w-full flex justify-center mt-5">
        <Logo />
      </div>
    </div>
  );
}

export default page;
