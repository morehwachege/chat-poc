"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import { apiFetch } from "@/lib/utils";

function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await apiFetch("/users/me", {
          method: "GET",
        });

        if (!res || !res.ok) {
          router.replace("/");
          return;
        }

        const data = await res.json();

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
      <ChatBox user={user} />
    </div>
  );
}

export default Home;
