"use client";
import { BASE_URL } from "@/lib/baseUrl";
import React, { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);

      console.log("Login successful:", data);
      return data;
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw error;
    }
  }

  return (
    <form className="space-y-5 self-center w-[60%]" onSubmit={handleSubmit}>
      <div className="">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@love-nanny.com"
          className="invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        />
      </div>

      <div className="">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-black active:scale-95 transition transform cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
