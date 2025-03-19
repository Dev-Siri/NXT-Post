import "./globals.css";
import { Inter } from "next/font/google";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NXT Post",
  description:
    "NXT is an online blogging platform similar to Medium or Dev.to.",
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://nxt-post.vercel.app"
      : "http://localhost:3000"
  ),
  openGraph: {
    title: "NXT Post",
    description:
      "NXT is an online blogging platform similar to Medium or Dev.to.",
  },
  twitter: {
    title: "NXT Post",
    description:
      "NXT is an online blogging platform similar to Medium or Dev.to.",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`m-0 box-border bg-dark-gray p-0 text-white ${inter.className}`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
