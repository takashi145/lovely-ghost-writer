import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "自動占い師",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
