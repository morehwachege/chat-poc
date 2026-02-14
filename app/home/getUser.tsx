"use client";
import { BASE_URL } from "@/lib/baseUrl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function GetUser() {
    const accessToken = localStorage.getItem("tk");
    async function handleGetUser(){
        try {
          const response = await fetch(`${BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
          }

          const data = await response.json();
          console.log("User: ", data)
          localStorage.setItem("user", data);

          return data;
        } catch (error: any) {
          console.error("Login error:", error.message);
          throw error;
        }
    }
  
  return <div></div>;
}

export default GetUser;
