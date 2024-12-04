import type { Metadata } from "next";
import localFont from "next/font/local";
import '../styles/globals.css';

// app/layout.tsx (or pages/_app.tsx if using the pages directory)
import { DotGothic16 } from '@next/font/google';

const dotGothic16 = DotGothic16({
  subsets: ['latin'], // Choose subsets relevant to your projec
  display: 'swap',
  weight: "400"
});

export const metadata: Metadata = {
  title: "Timons Tukei's Portfolio",
  description: "Explore Timon's portolio featuring his programming projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dotGothic16.className}>
      <body
        className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
