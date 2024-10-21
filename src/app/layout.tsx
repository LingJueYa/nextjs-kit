// LayOut

// 导入工具函数
import { cn } from "@/lib/utils";
// 导入全局样式
import "../styles/globals.css";
// 导入字体
import { Inter } from "next/font/google";
// 导入组件
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

// 配置 Inter 字体
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


// 根布局组件
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={inter.variable}>
      <head>
        {/* 添加安全相关的 meta 标签 */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* <meta name="referrer" content="strict-origin-when-cross-origin" /> */}
        {/* <meta
            httpEquiv="Content-Security-Policy"
            content={`
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.helping-mite-25.accounts.dev https://helping-mite-25.clerk.accounts.dev;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://clerk.helping-mite-25.accounts.dev https://helping-mite-25.clerk.accounts.dev;
              connect-src 'self' https://clerk.helping-mite-25.accounts.dev https://helping-mite-25.clerk.accounts.dev https://clerk-telemetry.com;
              frame-src 'self' https://clerk.helping-mite-25.accounts.dev https://helping-mite-25.clerk.accounts.dev;
              font-src 'self';
              worker-src 'self' blob:;
            `}
          /> */}
      </head>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground",
          "antialiased",
          "flex flex-col"
        )}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
