import { Provider } from "@/components/ui/provider";
import Layout from "../components/layouts/main";
import dynamic from "next/dynamic";
import { LanguageProvider } from "../lib/i18n";
import Fonts from "../components/fonts";
import "../styles/globals.css";

const ParticleBackground = dynamic(
  () => import("../components/ParticleBackground"),
  { ssr: false }
);

const LoadingScreen = dynamic(
  () => import("../components/LoadingScreen"),
  { ssr: false }
);

function Website({ Component, pageProps, router }) {
  return (
    <LanguageProvider>
      <Provider>
        <Fonts />
        <LoadingScreen />
        <ParticleBackground />
        <Layout router={router}>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </Provider>
    </LanguageProvider>
  );
}

export default Website;

