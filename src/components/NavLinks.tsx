"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLinks() {
  const path = usePathname();

  return (
    <div>
      {path !== "/" ? (
        <div className="flex gap-x-3 text-lg font-medium">
          <Link
            href={"/dashboard"}
            className={` px-3 py-1 ${
              path === "/dashboard" && "border-b-2  border-red-700"
            } `}
          >
            Dashboard
          </Link>
          <Link
            href={"/dashboard/transaction"}
            className={` px-3 py-1 ${
              path === "/dashboard/transaction" && "border-b-2  border-red-700"
            } `}
          >
            Transactions
          </Link>
          <Link
            href={"/dashboard/manage"}
            className={` px-3 py-1 ${
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
