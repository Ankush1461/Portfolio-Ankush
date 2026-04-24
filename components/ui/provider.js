"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/lib/theme";

export function Provider({ children }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
