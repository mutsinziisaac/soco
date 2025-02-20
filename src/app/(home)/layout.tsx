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
