import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiple Mockup Generator",
  description: "Customize and generate branded e-wallet screen mockups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
