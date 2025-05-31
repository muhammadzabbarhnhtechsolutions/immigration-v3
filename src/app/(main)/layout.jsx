'use client'
import { usePathname } from "next/navigation";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";

export default function Page({children}) {
    const pathname = usePathname()

    console.log(pathname,'pathnamevpathname');
    
    return (
       <>
       <Navbar/>
       {children}
       {
       pathname !== '/forum'  &&
       <Footer/>
       }
       </>
    );
}