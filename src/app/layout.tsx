import "./globals.css";
import { Inter } from "next/font/google";

import type { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NXT Post",
  description:
    "NXT is an online blogging platform similar to Medium or Dev.to.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`m-0 p-0 box-border ${inter.className}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
