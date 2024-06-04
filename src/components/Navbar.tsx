import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "./ui/ToggleTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoginPopup } from "./login-popup";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/Actions/actions";
import { Button } from "./ui/button";
import { LayoutDashboard, UsersRound, Wallet } from "lucide-react";
import NavLinks from "./NavLinks";

async function Navbar() {
  const path = "/";
  const session = await auth();

  return (
    <div className="max-w-[80vw] mb-10 mx-auto flex justify-between px-4 border-b border-primary/10 ">
      <div className="flex items-center gap-5 py-5">
        <Logo />
        <NavLinks />
      </div>
      <div className="flex items-center gap-x-3">
        <ModeToggle />
        {session?.user?.email ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session.user?.image!} />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <div>{session?.user?.name}</div>
                  <div className="text-primary/50 font-light text-xs">
                    {session?.user?.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col text-sm py-2 justify-start gap-y-2 px-2 ">
                  <Link
                    href={"/dashboard"}
                    className="hover:bg-secondary/50  px-1 py-1 rounded-lg w-full flex items-center justify-between"
                  >
                    Dashboard
                    <LayoutDashboard size={16} />
                  </Link>
                  <Link
                    href={"/dashboard/transaction"}
                    className="hover:bg-secondary/50  px-1 py-1 rounded-lg w-full flex items-center justify-between"
                  >
                    Transactions
                    <Wallet size={16} />
                  </Link>
                  <Link
                    href={"/dashboard/manage"}
                    className="hover:bg-secondary/50  px-1 py-1 rounded-lg w-full flex items-center justify-between"
                  >
                    Manage
                    <UsersRound size={16} />
                  </Link>
                </div>
                <DropdownMenuSeparator />
                <form
                  action={async () => {
                    "use server";
                    await logout();
                  }}
                >
                  <Button className="w-full text-red-500" variant={"secondary"}>
                    Logout
                  </Button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <LoginPopup />
        )}
      </div>
    </div>
  );
}

export default Navbar;
