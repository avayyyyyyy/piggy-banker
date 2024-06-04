import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { LayoutDashboard, UsersRound, Wallet } from "lucide-react";
import { signOut } from "@/auth";
import { logout } from "@/Actions/actions";

function UserAvatar({
  data,
}: {
  data: { user: { name: string; email: string; image: string } };
}) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={data.user?.image!} />
            <AvatarFallback>{data.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div>{data.user.name}</div>
            <div className="text-primary/50 font-light text-xs">
              {data.user.email}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col text-sm py-2 justify-start gap-y-2 px-2 ">
            <Link
              href={"/dashboard"}
              className="hover:bg-secondary/50 px-1 py-1 rounded-lg w-full flex text-sm  items-center justify-between"
            >
              Dashboard
              <LayoutDashboard size={16} />
            </Link>
            <Link
              href={"/dashboard/transaction"}
              className="hover:bg-secondary/50 px-1 py-1 rounded-lg w-full flex text-sm  items-center justify-between"
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
          <form action={() => logout()}>
            <Button className="w-full text-red-500" variant={"secondary"}>
              Logout
            </Button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserAvatar;
