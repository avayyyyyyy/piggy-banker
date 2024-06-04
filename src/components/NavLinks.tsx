"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLinks() {
  const path = usePathname();

  return (
    <div>
      {path !== "/" ? (
        <div className="lg:flex gap-x-3 hidden text-lg font-medium">
          <Link
            href={"/dashboard"}
            className={` px-3 py-1 md:text-md hidden md:block  ${
              path === "/dashboard" && "border-b-2  border-red-700"
            } `}
          >
            Dashboard
          </Link>
          <Link
            href={"/dashboard/transaction"}
            className={` px-3 py-1 md:text-md hidden md:block  ${
              path === "/dashboard/transaction" && "border-b-2  border-red-700"
            } `}
          >
            Transactions
          </Link>
          <Link
            href={"/dashboard/manage"}
            className={` px-3 py-1 md:text-md hidden md:block  ${
              path === "/dashboard/manage" && "border-b-2  border-red-700"
            } `}
          >
            Manage
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NavLinks;
