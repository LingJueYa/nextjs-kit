// 用户头像组件

import React from "react";
import { type User } from "next-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { type AvatarProps } from "@radix-ui/react-avatar";

// 这里我们只需要User类型中的name和image属性
interface Props extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar = ({ user, ...props }: Props) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}
            alt={`${user.name || "用户"}的头像`}
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name || "用户"}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
