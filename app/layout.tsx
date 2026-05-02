import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "仮想顧客インタビュー・シミュレーター",
  description: "AIペルソナと市場調査データを組み合わせ、高コストな顧客インタビューを低コストで擬似体験。Next.js + Mastra + Claude API + MongoDB によるRAGシステム。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full bg-white text-gray-900">{children}</body>
    </html>
  );
}
