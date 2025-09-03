import type { Metadata } from "next";
import { Geist, Geist_Mono,Poppins } from "next/font/google";
import { Marko_One } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ClerkProvider } from "@clerk/nextjs"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const marko = Marko_One({
  weight: "400", // only available weight
  subsets: ["latin"],
  variable: "--font-marko", // css variable
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: '--font-poppins',  // This defines your CSS variable
  subsets: ['latin'],
  weight:["400","500","600","700"]
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Immigration Navigator",
  description: "Immigration Navigator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${marko.variable}  antialiased`}
      >
        <ClerkProvider >
      <StoreProvider >
        {children}
        </StoreProvider> 
        <ToastContainer />
</ClerkProvider>
      </body>
    </html>
  );
}
