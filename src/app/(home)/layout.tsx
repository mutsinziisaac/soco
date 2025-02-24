import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Fresh Organic Groceries Online in Uganda | Soco",
  description:
    "Order fresh groceries online in Uganda! Browse a wide range of fruits, vegetables, dairy, meats, and pantry essentials. Enjoy fast, reliable delivery straight to your door. Shop now for affordable and convenient grocery shopping!",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="relative">
      <main className="flex-1 ">{children}</main>
    </body>
  );
}
