'use client'
import { usePathname } from "next/navigation";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import Navbar1 from "../../components/layout/Navbar2";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function Page({children}) {
    const pathname = usePathname()

    console.log(pathname,'pathnamevpathname');
    
    return (
       <>
       <Navbar1/>
       {children}
       {/* { */}
    {/* //    pathname !== '/forum'  &&
    // //    <Footer/> */}
    {/* //    } */}
       </>
    );
}