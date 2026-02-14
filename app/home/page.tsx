"use client";

import { BASE_URL } from "@/lib/baseUrl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";

function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tk");

    if (!token) {
      router.replace("/");
      return;
    }

    async function fetchUser() {
      console.log("token: ", token)
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          router.replace("/");
          return;
        }

        const data = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        router.replace("/");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  if (loading) return null;

  return (
    <div className="w-full">
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <ChatBox />
    </div>
  );
}

export default Home;
