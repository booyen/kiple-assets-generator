import type { Metadata } from "next";
import { Inter, Roboto, Poppins, Montserrat, Open_Sans, Lato, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

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
      <body className={`
        ${inter.variable}
        ${roboto.variable}
        ${poppins.variable}
        ${montserrat.variable}
        ${openSans.variable}
        ${lato.variable}
        ${nunito.variable}
        font-sans antialiased
      `}>
        {children}
      </body>
    </html>
  );
}
