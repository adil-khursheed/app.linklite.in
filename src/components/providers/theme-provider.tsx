"use client";

import React from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { Toaster } from "../ui/sonner";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ToastProvider />
    </NextThemeProvider>
  );
};

export default ThemeProvider;

function ToastProvider() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      richColors
      position="bottom-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
