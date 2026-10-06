import type { Metadata } from "next";
import {
  Handjet,
  Inter,
  Just_Me_Again_Down_Here,
  Space_Mono,
} from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Paper from "./components/Paper";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const handjet = Handjet({ subsets: ["latin"], variable: "--font-handjet" });

const handwriting = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "Robin — Product Designer",
  description: "I design software that gets out of your way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} ${handjet.variable} ${handwriting.variable} antialiased`}
    >
      <body className="font-sans">
        <noscript>
          <style>{`.paper[data-intro]{clip-path:none!important}`}</style>
        </noscript>
        <div className="grid-backdrop fixed inset-0 -z-10" aria-hidden />
        <SmoothScroll>
          <Paper>
            <Navbar />
            {children}
          </Paper>
        </SmoothScroll>
      </body>
    </html>
  );
}
