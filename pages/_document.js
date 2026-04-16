import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="description" content="Ankush Karmakar — Microsoft Certified Tech Consultant | CRM Solutions Architect | Portfolio" />
        <meta property="og:title" content="Ankush Karmakar — Portfolio" />
        <meta property="og:description" content="Microsoft Certified Tech Consultant with 2+ years at PwC and EY. Expert in CRM solutions and cloud migrations." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
