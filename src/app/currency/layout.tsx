import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import prisma from "@/db";
import React, { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}

export default layout;
