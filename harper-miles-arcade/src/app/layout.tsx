import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harper & Miles's Arcade",
  description: "A little home arcade of games we built together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
