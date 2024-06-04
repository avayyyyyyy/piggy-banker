import { PiggyBank } from "lucide-react";
import React from "react";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <PiggyBank className="stroke h-12 w-12 stroke-red-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        PiggyBanker
      </p>
    </a>
  );
}

export function LogoMobile() {
  return (
    <a href="/" className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        PiggyBanker
      </p>
    </a>
  );
}

export default Logo;
