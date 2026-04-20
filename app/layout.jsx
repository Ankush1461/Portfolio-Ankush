import { GlobalProviders } from "./providers";
import Layout from "@/components/layouts/main";
import "@/styles/globals.css";

export const metadata = {
  metadataBase: new URL("https://portfolio-ankush.vercel.app/"),
  title: "Ankush Karmakar | Portfolio",
  description: "Ankush Karmakar's Professional Portfolio - Microsoft Certified Tech Consultant, Dynamics CRM Specialist, and Data Science Enthusiast.",
  authors: [{ name: "Ankush Karmakar" }],
  openGraph: {
    siteName: "Ankush Karmakar",
    title: "Ankush Karmakar | Portfolio",
    description: "Microsoft Certified Tech Consultant with 2+ years at PwC and EY. Expert in CRM solutions and cloud migrations.",
    type: "website",
    images: [
      {
        url: "/images/ankushprofile.png",
        width: 1200,
        height: 1200,
        alt: "Ankush Karmakar Portfolio Preview",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankush Karmakar | Portfolio",
    description: "Microsoft Certified Tech Consultant with 2+ years at PwC and EY.",
    images: ["/images/ankushprofile.png"],
  }
};

export const viewport = {
  themeColor: "#202023",
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/footprint.png" />
        <link rel="shortcut icon" href="/images/footprint.png" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;500;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="preload" href="/scene.splinecode" as="fetch" crossOrigin="anonymous" />
      </head>
      <body style={{ background: "#202023" }}>
        <div 
          id="initial-loader" 
          suppressHydrationWarning
          style={{ position: "fixed", inset: 0, zIndex: 99998, background: "#202023", pointerEvents: "none" }} 
        />
        <GlobalProviders>
          <Layout>
            {children}
          </Layout>
        </GlobalProviders>
      </body>
    </html>
  );
}
