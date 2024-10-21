"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

// 创建QueryClient实例，并配置默认选项以提高性能
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 防止窗口聚焦时不必要的重新获取
      retry: 1, // 限制重试次数，避免过多的网络请求
    },
  },
});


/**
 * Providers组件：包装应用程序并提供各种上下文
 * [React Query]、[主题设置]、[Clerk]
 */
const Providers: React.FC<Props> = ({ children }: ThemeProviderProps) => {
  return (
   
      <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>
          {children}
        </SessionProvider>
        </NextThemesProvider>
      </QueryClientProvider>
   
  );
};

export default React.memo(Providers);
