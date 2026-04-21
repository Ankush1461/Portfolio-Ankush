import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `var(--font-m-plus), sans-serif` },
        body: { value: `var(--font-inter), sans-serif` },
      },
      colors: {
        glassTeal: { value: "#88ccca" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: "#f0e7db", _dark: "#202023" },
          },
        },
        accent: {
          DEFAULT: {
            value: { _light: "#3d7aed", _dark: "#ff63c3" },
          },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg",
      transitionProperty: "background-color",
      transitionDuration: "normal",
    },
  },
});

export const system = createSystem(defaultConfig, config);
