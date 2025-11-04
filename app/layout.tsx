import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Associa Football Club & Academy (AFCA)",
  description:
    "Associa FCA is a premier football development academy nurturing young talents across Nigeria and Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-gray-100 font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
