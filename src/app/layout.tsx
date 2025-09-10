import { LayoutNavigation } from "@/components/organisms/layout-navigation/layout-navigation";
import { getAllArticles } from "@/lib/mdx";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toylovers.club"),
  title: {
    default: "Toy Lovers: Toy Photographers Stories",
    template: "%s | Toy Lovers",
  },
  description:
    "Discover talented toy photographers through interviews, stunning galleries, and behind-the-scenes stories. Explore creative toy photography from artists around the globe.",
  keywords: [
    "toy photography",
    "toy photographers",
    "creative photography",
    "action figure photography",
    "collectibles photography",
    "miniature photography",
    "toy art",
    "photography interviews",
    "photography gallery",
    "toy collection",
  ],
  authors: [{ name: "Toy Lovers", url: "https://toylovers.club" }],
  creator: "Toy Lovers",
  publisher: "Toy Lovers",
  category: "Photography",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toylovers.club",
    siteName: "Toy Lovers",
    title: "Toy Lovers: Toy Photographers Stories",
    description:
      "Discover talented toy photographers through interviews, stunning galleries, and behind-the-scenes stories.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Toy Lovers - Toy Photographers Stories",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@toylovers",
    creator: "@toylovers",
    title: "Toy Lovers: Toy Photographers Stories",
    description:
      "Discover talented toy photographers through interviews, stunning galleries, and behind-the-scenes stories.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://toylovers.club",
  },
  verification: {
    google: "your-google-site-verification",
    // yandex: "your-yandex-verification",
    // yahoo: "your-yahoo-verification",
  },
  other: {
    "theme-color": "#ffffff",
    "color-scheme": "light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Toy Lovers",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get articles for navigation
  const articles = getAllArticles();

  // Structured data for the organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Toy Lovers",
    url: "https://toylovers.club",
    description:
      "A platform showcasing talented toy photographers from around the world through interviews and galleries.",
    // sameAs: [
    //   "https://instagram.com/toylovers",
    //   "https://twitter.com/toylovers",
    // ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial",
      email: "v.desdoigts@gmail.com",
    },
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <Analytics />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://toylovers.club" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme and mobile optimization */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Toy Lovers" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${poppins.variable} antialiased overflow-x-hidden`}>
        <LayoutNavigation articles={articles} />
        <main className="min-h-screen pt-12 view-transition-content">
          {children}
        </main>
      </body>
    </html>
  );
}
