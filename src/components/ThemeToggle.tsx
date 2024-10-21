"use client";

// ThemeToggle组件:用于切换网站主题的下拉菜单
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return (
    <div className={className} {...props}>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
        aria-label={`切换到${theme === "dark" ? "亮色" : "暗色"}主题`}
      >
        <Sun className="h-5 w-5 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
}
