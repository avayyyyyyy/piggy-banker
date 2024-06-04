import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import prisma from "@/db";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="md:max-w-[80vw] px-6 w-screen md:px-4 overflow-hidden  mx-auto">
      <Navbar />
      {children}
    </div>
  );
}

export default layout;
