"use client";

import "./globals.css";
import { GeistSans, GeistMono } from "geist/font"; // objects
import localFont from "next/font/local";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/nextjs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Geist fonts are objects, no need to call
const geistSans = GeistSans; 
const geistMono = GeistMono;

// Local Poppins
const poppins = localFont({
  src: [
    { path: "/fonts/Poppins-Regular.woff2", weight: "400" },
    { path: "/fonts/Poppins-Medium.woff2", weight: "500" },
    { path: "/fonts/Poppins-Bold.woff2", weight: "700" },
  ],
  variable: "--font-poppins",
});

// Local Marko One
const marko = localFont({
  src: "/fonts/MarkoOne-Regular.woff2",
  weight: "400",
  variable: "--font-marko",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${marko.variable} antialiased`}
      >
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <StoreProvider>{children}</StoreProvider>
          <ToastContainer />
        </ClerkProvider>
      </body>
    </html>
  );
}
