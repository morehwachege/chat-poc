"use client";
import { createConsumer } from "@rails/actioncable";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  body: string;
  sender_id: string;
  deleted_at: string | null;
  sender_name: string;
  created_at: string;
}

let subscription: any;
function ChatBox({ user }: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("tk");
    const CABLE_URL = `ws:localhost:3000/cable?token=${token}`;
    const cable = createConsumer(CABLE_URL);

    subscription = cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received(data: any) {
          setMessages((prev) => {
            console.log("Finders", data, user);
            return [...prev, data];
          });
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

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  //   useEffect(() => {
  //     console.log(messages, user);
  //   }, [setMessages]);
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className="hidden md:flex md:flex-col w-64 
    bg-white dark:bg-gray-800 
    border-r border-gray-200 dark:border-gray-700 
    transition-colors duration-300"
      >
        <div
          className="p-4 border-b border-gray-200 dark:border-gray-700 
      font-semibold text-lg text-gray-800 dark:text-gray-100"
        >
          Chats
        </div>

        <div className="flex-1 overflow-y-auto">
          <div
            className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 
        cursor-pointer text-gray-700 dark:text-gray-200 transition"
          >
            User One
          </div>
          <div
            className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 
        cursor-pointer text-gray-700 dark:text-gray-200 transition"
          >
            User Two
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 
      bg-white dark:bg-gray-800 
      border-b border-gray-200 dark:border-gray-700 
      shadow-sm transition-colors duration-300"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Username
            </h2>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>

        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto px-6 py-6 space-y-4 
            bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
        >
          {/* Incoming Message */}
          <div className="flex justify-start">
            <div
              className="max-w-xs md:max-w-md px-4 py-2 
                bg-white dark:bg-gray-800 
                text-gray-800 dark:text-gray-100 
                rounded-2xl rounded-bl-none shadow-sm text-sm transition"
            >
              Incoming message that the other user in the pair sent. It should
              be able to accomodate large paragraphs of text
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="flex justify-end">
            <div
              className="max-w-xs md:max-w-md px-4 py-2 
                bg-black dark:bg-gray-600 
                text-white 
                rounded-2xl rounded-br-none shadow-sm text-sm transition"
            >
              Outgoing message representing a message that I am sending to the
              other party. Should also be able to accomodate large paragraphs of
              text
            </div>
          </div>

          {messages.map((msg, i) => {
            return msg.sender_id == user.id ? (
              <div key={i} className="flex justify-end">
                <div
                  className="max-w-xs md:max-w-md px-4 py-2 
                bg-black dark:bg-gray-600 
                text-white 
                rounded-2xl rounded-br-none shadow-sm text-sm transition"
                >
                  {msg.body}
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div
                  className="max-w-xs md:max-w-md px-4 py-2 
                bg-black dark:bg-gray-600 
                text-white 
                rounded-2xl rounded-br-none shadow-sm text-sm transition"
                >
                  Outgoing message representing a message that I am sending to
                  the other party. Should also be able to accomodate large
                  paragraphs of text
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div
          className="px-6 py-4 
      bg-white dark:bg-gray-800 
      border-t border-gray-200 dark:border-gray-700 
      transition-colors duration-300"
        >
          <div className="flex items-center gap-3">
            {/* Attach Button */}
            <button
              className="p-2 rounded-full 
          hover:bg-gray-100 dark:hover:bg-gray-700 
          text-gray-700 dark:text-gray-200 
          transition cursor-pointer"
            >
              📎
            </button>

            {/* Input */}
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 
            border border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700 
            text-gray-800 dark:text-gray-100 
            rounded-full 
            focus:outline-none 
            focus:ring-2 focus:ring-black dark:focus:ring-gray-400 
            focus:border-transparent 
            transition"
            />

            {/* Send Button */}
            <button
              onClick={sendMessage}
              className="px-6 py-2 
          bg-black dark:bg-gray-600 
          text-white 
          rounded-full font-medium 
          hover:bg-gray-800 dark:hover:bg-gray-500 
          active:scale-95 
          transition-transform cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
