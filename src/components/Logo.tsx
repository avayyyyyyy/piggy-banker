import { PiggyBank } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <PiggyBank className="stroke h-8 w-8 md:h-12 md:w-12 stroke-red-500 stroke-[1.5]" />
      <p className="bg-gradient-to-br from-red-400 to-red-700 bg-clip-text md:text-3xl text-xl font-bold leading-tight tracking-tighter text-transparent">
        PiggyBanker
      </p>
    </Link>
  );
}

export function LogoMobile() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        PiggyBanker
      </p>
    </Link>
  );
}

export default Logo;
