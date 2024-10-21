// 登陆按钮组件

"use client";
import React from "react";
// 导入第三方库
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Login } from "@/components/icons/Login";

interface SignInButtonProps {
  text: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ text }) => {
  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("登录失败:", error);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
      variant="outline"
      className="text-foreground flex items-center justify-center"
      aria-label={`使用Google账号${text}`}
    >
      <Login className="mr-2" aria-hidden="true" />
      <span>{text}</span>
    </Button>
  );
};

export default SignInButton;
