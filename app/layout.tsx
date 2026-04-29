import type { Metadata } from "next";
import "./globals.css";
import "@studio-manfred/manfred-design-system/styles";
import { CursorBlob } from "@/components/CursorBlob";

export const metadata: Metadata = {
  title: "Studio Manfred — Building Better Product Companies",
  description:
    "Manfred creates impact through leadership, customer research and product design. Our mission is to make the product world more customer driven.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full light">
      <body className="min-h-full flex flex-col">
        <CursorBlob />
        {children}
      </body>
    </html>
  );
}
