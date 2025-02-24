import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientProviders from "./clientProviders";
import Head from "next/head";

// Local fonts setup
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata
export const metadata: Metadata = {
  title: "Buy Fresh Organic Groceries Online in Uganda | Soco",
  description:
    "Order fresh groceries online in Uganda! Browse a wide range of fruits, vegetables, dairy, meats, and pantry essentials. Enjoy fast, reliable delivery straight to your door. Shop now for affordable and convenient grocery shopping!",
};

// RootLayout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-title" content="soco" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
