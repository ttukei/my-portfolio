import type { Metadata } from "next";
import localFont from "next/font/local";
import '../styles/globals.css';

const dotGothic16 = localFont({
  src: "./fonts/DotGothic16-Regular.woff",
  variable: "--font-dotgothic",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Timons Tukei's Portfolio",
  description: "Explore Timon's portfolio featuring his programming projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      className={`${dotGothic16.variable} ${dotGothic16.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
