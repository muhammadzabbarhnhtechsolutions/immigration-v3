"use client";

import "./globals.css";
import localFont from "next/font/local";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/nextjs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const poppins = localFont({
  src: [
    { path: "../fonts/Poppins-Regular.ttf", weight: "400" },
    { path: "../fonts/Poppins-Medium.ttf", weight: "500" },
    { path: "../fonts/Poppins-Bold.ttf", weight: "700" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const marko = localFont({
  src: "../fonts/MarkoOne-Regular.ttf",
  weight: "400",
  variable: "--font-marko",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${marko.variable} antialiased`}>
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_bGVhZGluZy1jaXZldC0zMy5jbGVyay5hY2NvdW50cy5kZXYk"}>
          <StoreProvider>{children}</StoreProvider>
          <ToastContainer />
        </ClerkProvider>
      </body>
    </html>
  );
}
