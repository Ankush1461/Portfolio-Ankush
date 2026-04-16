"use client";

import { useTheme } from "next-themes";

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
  };
}

export function useColorModeValue(light, dark) {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark" ? dark : light;
}
