import { GlobalProviders } from "./providers";
import Layout from "@/components/layouts/main";
import "@/styles/globals.css";

export const metadata = {
  metadataBase: new URL("https://portfolio-ankush.vercel.app/"),
  title: "Ankush Karmakar | Portfolio",
  description:
    "Ankush Karmakar's Professional Portfolio - Microsoft Certified Tech Consultant, Dynamics CRM Specialist, and Data Science Enthusiast.",
  authors: [{ name: "Ankush Karmakar" }],
  openGraph: {
    siteName: "Ankush Karmakar",
    title: "Ankush Karmakar | Portfolio",
    description:
      "Microsoft Certified Tech Consultant with 2+ years at PwC and EY. Expert in CRM solutions and cloud migrations.",
    type: "website",
    images: [
      {
        url: "/images/computer.webp",
        width: 1200,
        height: 1200,
        alt: "Ankush Karmakar Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankush Karmakar | Portfolio",
    description:
      "Microsoft Certified Tech Consultant with 2+ years at PwC and EY.",
    images: ["/images/computer.webp"],
  },
};

export const viewport = {
  themeColor: "#202023",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

import { M_PLUS_Rounded_1c, Inter } from "next/font/google";
import localFont from "next/font/local";

const jetBrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-Bold.woff2",
  variable: "--font-jetbrains",
  weight: "700",
});

const mPlus = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-m-plus",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mPlus.variable} ${inter.variable} ${jetBrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/footprint.webp" />
        <link
          rel="shortcut icon"
          href="/images/footprint.webp"
          type="image/x-icon"
        />
      </head>
      <body style={{ background: "#202023 !important" }}>
        <div
          id="initial-loader"
          suppressHydrationWarning
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99998,
            background: "#202023 !important",
            pointerEvents: "none",
          }}
        />
        <GlobalProviders>
          <Layout>{children}</Layout>
        </GlobalProviders>
      </body>
    </html>
  );
}
