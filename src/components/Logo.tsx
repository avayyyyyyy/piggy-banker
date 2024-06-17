import { PiggyBank } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <PiggyBank className="stroke h-6 w-6 md:h-12 md:w-12 stroke-purple-500 stroke-[1.5]" />
      <p className="bg-gradient-to-br from-purple-400 via-orange-500  to-yellow-400 bg-clip-text md:text-2xl text-xl font-bold leading-tight tracking-tighter text-transparent">
        PiggyBanker
      </p>
    </Link>
  );
}

export function LogoMobile() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        PiggyBanker
      </p>
    </Link>
  );
}

export default Logo;
