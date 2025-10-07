"use client"
import Forum from "@/components/Forum/Forum";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Page = () => {
  const router = useRouter();
  useEffect(() => {
  const user = localStorage.getItem("user"); 
  if(!user){
    router.push("/login");
  
  }
  
  }, [])
  return (
    <div>
      <Forum />
    </div>
  );
};

export default Page;
