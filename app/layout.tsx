import type { Metadata } from "next";
import localFont from "next/font/local";
import '../styles/globals.css';

const bespokeslab = localFont({
  src: "./fonts/BespokeSlab-Bold.woff",
  variable: "--font-bespokeslab",
  weight: "700",
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
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body 
      className={`${bespokeslab.variable} ${bespokeslab.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
