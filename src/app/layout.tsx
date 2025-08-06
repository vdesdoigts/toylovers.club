import { InterviewCounter } from "@/components/organisms/interview-counter/interview-counter";
import { NavigationLinks } from "@/components/organisms/navigation-links/navigation-links";
import { getAllArticles } from "@/lib/mdx";
import { Menu } from "lucide-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
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
        <nav className="fixed w-full flex flex-row items-center justify-between top-0 z-50 h-[54px] bg-black">
          <div className="h-full flex flex-row items-center text-white">
            <Link
              href="/"
              className="h-full w-[100px] flex flex-row justify-center items-center border-r border-[#212128]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22.76 19.62"
                width={80}
                height={24}
              >
                <path
                  d="M14.75 15.63 16.94 0H.53L0 3.82h5.6l-2.22 15.8H7.7l2.22-15.8h2.16l-2.2 15.8H22.2l.56-3.99h-8.01z"
                  fill="#fff"
                />
              </svg>
            </Link>
            <div className="h-full w-[54px] flex justify-center items-center cursor-pointer">
              <Menu className="w-6 h-6 text-white" />
            </div>
            <div>
              <InterviewCounter articles={articles} />
            </div>
          </div>
          <div>
            <NavigationLinks articles={articles} />
          </div>
        </nav>
        <main className="min-h-screen pt-12">{children}</main>
      </body>
    </html>
  );
}
