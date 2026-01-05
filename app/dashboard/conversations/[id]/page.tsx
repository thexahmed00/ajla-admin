"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "../../components/ChatMessage";
import { Message } from "../../types/message";

export default function ChatPage() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      text:
        "Hello, I would like to book a private jet to Dubai for a business trip next week.",
      time: "01:30 PM",
    },
    {
      id: "2",
      sender: "admin",
      text:
        "Good morning Mr. Al-Rashid! I’d be happy to assist you. Could you please provide:\n1. Departure date & time\n2. Number of passengers\n3. Aircraft preference",
      time: "01:35 PM",
    },
    {
      id: "3",
      sender: "user",
      text:
        "Thank you! January 5th around 8 AM, 4 passengers. Prefer Gulfstream G650.",
      time: "01:40 PM",
    },
    {
      id: "4",
      sender: "admin",
      text:
        "Excellent choice! A Gulfstream G650 is available. Estimated flight time is 3 hours. Total cost: SAR 185,000 including catering & ground transport. Shall I proceed?",
      time: "01:50 PM",
    },
  ]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Dummy admin reply
    setTimeout(() => {
      const adminReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "admin",
        text: "Thank you for the details 👍 I’ll confirm and update you shortly.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, adminReply]);
    }, 1200);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col rounded-2xl border border-[#2A2A2A] bg-[#161616]">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-[#2A2A2A] px-6 py-4">
        <Link
          href="/"
          className="rounded-lg bg-[#1F1F1F] p-2 hover:bg-[#2A2A2A]"
        >
          ←
        </Link>

        <h2 className="text-lg font-medium">
          Conversation #1
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#2A2A2A] px-6 py-4">
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 rounded-xl bg-[#1F1F1F] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
          />
          <button
            onClick={sendMessage}
            className="rounded-xl bg-[#FF9F7A] px-4 py-3 text-black hover:opacity-90"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
