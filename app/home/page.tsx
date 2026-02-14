"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GetUser from "./getUser";

function Home() {
    const router = useRouter();
    const [user, setUser] = useState<string | null>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
     useEffect(() => {
       const storedUser = localStorage.getItem("user");

       if (!storedUser) {
         router.replace("/");
       } else {
         setUser(storedUser);
       }

       setCheckingAuth(false);
     }, [router]);

    if(checkingAuth) return null
  return <div>
    <GetUser />
    <p>This is something new</p>
  </div>;
}

export default Home;
