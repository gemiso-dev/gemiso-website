import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "제미소 | GEMISO",
  description: "제미소 공식 홈페이지",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
