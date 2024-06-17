import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "./ui/ToggleTheme";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoginPopup } from "./login-popup";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "../lib/actions";
import { Button } from "./ui/button";
import {
  Github,
  LayoutDashboard,
  Menu,
  UsersRound,
  Wallet,
} from "lucide-react";
import NavLinks from "./NavLinks";

async function Navbar() {
  const path = "/";
  const session = await auth();

  return (
    <div className="md:max-w-[80vw] max-w-screen mb-10 mx-auto flex justify-between px-4  md:px-6 border-b border-primary/10 ">
      <div className="flex items-center md:gap-5 py-5">
        <Logo />
        <NavLinks />
      </div>
      <div className="flex items-center gap-x-3">
        {/* <ModeToggle /> */}
        {session?.user?.email ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 py-2 px-3 cursor-pointer  border rounded-full">
                  <Avatar className="cursor-pointer h-8 w-8">
                    <AvatarImage src={session.user?.image!} />

                    <AvatarFallback>
                      {session.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Menu />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <div>{session?.user?.name}</div>
                  <div className="text-primary/50 font-light text-xs">
                    {session?.user?.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="md:flex flex-col text-sm py-2 justify-start gap-y-2 px-2 ">
                  <Link
                    href={"/dashboard"}
                    className="hover:bg-secondary/50 px-1 py-1 rounded-lg w-full flex items-center justify-between"
                  >
                    Dashboard
                    <LayoutDashboard size={16} />
                  </Link>
                  <Link
                    href={"/dashboard/transaction"}
                    className="hover:bg-secondary/50 px-1 py-1 rounded-lg w-full flex items-center justify-between"
                  >
                    Transactions
                    <Wallet size={16} />
                  </Link>
                  <Link
                    href={"/dashboard/manage"}
                    className="hover:bg-secondary/50 px-1 py-1 rounded-lg w-full flex items-center justify-between"
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
          <>
            <LoginPopup />
            <Button asChild size={"sm"} variant={"secondary"}>
              <Link
                href={"https://github.com/avayyyyyyy/piggy-banker"}
                target="_blank"
                className="hidden  md:flex"
              >
                Star on Github
                <Github size={18} className="ml-2" />
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
