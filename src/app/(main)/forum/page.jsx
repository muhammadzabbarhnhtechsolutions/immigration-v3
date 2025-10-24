"use client"
import Forum from "@/components/Forum/Forum";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Page = () => {

  return (
    <div>
      <Forum />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Page;
