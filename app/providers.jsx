"use client";

import { Provider } from "@/components/ui/provider";
import { LanguageProvider } from "@/lib/i18n";
import { LoadingProvider } from "@/lib/loading-context";

export function GlobalProviders({ children }) {
  return (
    <LoadingProvider>
      <LanguageProvider>
        <Provider>
          {children}
        </Provider>
      </LanguageProvider>
    </LoadingProvider>
  );
}
