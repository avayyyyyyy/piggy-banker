import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) {
    return redirect("/");
  }

  return <div>{children}</div>;
}

export default layout;
