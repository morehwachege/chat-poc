"use client";
import { useEffect, useState } from "react";
import { cable } from "@/lib/cable";

export default function Chat() {
  let subscription: any;
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    subscription = cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received(data: any) {
          setMessages((prev) => [...prev, data.body]);
        },
      },
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sendMessage = () => {
    if (!subscription) return;
    subscription.send({
      message: input,
    });
    setInput("");
  };

  return (
    <div>
      <div>
        <p className="text-gray-400">message: </p>

        {messages.map((msg, i) => {
          return (
            <div key={i}>
              <p className="text-gray-400">message: {msg}</p>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <input
          className="border border-gray-400 rounded h-10"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="flex h-12 w-full items-center justify-center rounded-full border border-solid
            border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] 
            dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px] cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
}
