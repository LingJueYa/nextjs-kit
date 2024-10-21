"use client";

// 用户账号导航组件

import React from "react";
import type { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

// 只需要User类型中的name、image和email属性
type Props = {
  user: Pick<User, "name" | "image" | "email">;
};

const UserAccountNav = ({ user }: Props) => {
  // 登出
  const handleSignOut = (event: Event) => {
    event.preventDefault();
    signOut().catch(console.error);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="outline-none hover:ring-2 hover:ring-offset-2 hover:ring-[#FE7600] rounded-full transition-all ease-in-out duration-300"
          aria-label="用户菜单"
        >
          <UserAvatar
            className="w-10 h-10"
            user={{
              name: user.name || null,
              image: user.image || null,
            }}
          />
        </button>
      </DropdownMenuTrigger>
      {/* 下拉菜单内容 */}
      <DropdownMenuContent className="bg-white shadow-lg" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && (
              <p className="font-medium text-zinc-700">{user.name}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {/* 登出选项 */}
        <DropdownMenuItem
          onSelect={handleSignOut}
          className="text-red-600 cursor-pointer"
        >
          登出
          <LogOut className="w-4 h-4 ml-2 " />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
