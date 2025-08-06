import { LayoutNavigation } from "@/components/organisms/layout-navigation/layout-navigation";
import { getAllArticles } from "@/lib/mdx";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Toy Lovers | Design Systems & Typography",
  description:
    "Exploring design systems, typography, accessibility, and modern web development practices.",
  keywords: [
    "design systems",
    "typography",
    "accessibility",
    "web development",
    "UI/UX",
  ],
  authors: [{ name: "Toy Lovers" }],
  openGraph: {
    title: "Toy Lovers | Design Systems & Typography",
    description:
      "Exploring design systems, typography, accessibility, and modern web development practices.",
    type: "website",
    siteName: "Toy Lovers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toy Lovers | Design Systems & Typography",
    description:
      "Exploring design systems, typography, accessibility, and modern web development practices.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get articles for navigation
  const articles = getAllArticles();

  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${poppins.variable} antialiased overflow-x-hidden`}>
        <LayoutNavigation articles={articles} />
        <main className="min-h-screen pt-12 view-transition-content">
          {children}
        </main>
      </body>
    </html>
  );
}
