import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import PageLoader from "./components/PageLoader";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.29tech.io'),
  title: "29.tech — IT Consulting & Software Development",
  description:
    "29.tech is an IT consulting and software development partner helping businesses design, build and scale custom digital solutions, AI systems and modern cloud infrastructure.",
  keywords: [
    "IT consulting",
    "software development company",
    "custom software development",
    "web application development",
    "mobile app development",
    "AI development",
    "DevOps",
    "cloud infrastructure",
    "29.tech",
  ],
  openGraph: {
    title: "29.tech — IT Consulting & Software Development",
    description:
      "Technology expertise delivered through engineering. Custom software, AI systems and cloud infrastructure for businesses.",
    url: "https://www.29tech.io",
    siteName: "29.tech",
    images: [
      {
        url: "/social_og.png",
        width: 1200,
        height: 675,
        type: "image/png",
        alt: "29.tech — IT Consulting & Software Development",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "29.tech — IT Consulting & Software Development",
    description:
      "Technology expertise delivered through engineering. Custom software, AI systems and cloud infrastructure for businesses.",
    images: ["/social_og.png"],
    creator: "@29dot_tech",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#f5f6f8" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col">
        <PageLoader />
        <SmoothScroll />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NGM3JZML"
          strategy="afterInteractive"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </body>
    </html>
  );
}
