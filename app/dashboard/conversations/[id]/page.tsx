"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "../../components/ChatMessage";
import { Message } from "../../types/message";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { id } = useParams();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const conversationId = id; // <-- Use dynamic id from URL
  // Fetch chat messages
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const res = await fetch(`/api/chat/messages?conversationId=${conversationId}`);
  //       const data = await res.json();
  //       setMessages(data.messages || []);
  //     } catch (error) {
  //       console.error("Failed to load messages", error);
  //     }
  //   };

  //   fetchMessages();
  // }, [conversationId]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    let token = localStorage.getItem("access_token");

    const adminMessage: Message = {
      id: Date.now().toString(),
      sender: "admin",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, adminMessage]);

    const textToSend = input;
    setInput("");

    try {
      const res = await fetch(`http://44.206.101.8/api/v1/admin/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          content: input,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }
    } catch (err) {
      console.error("Failed to send", err);
      // Optional rollback
      setMessages((prev) =>
        prev.filter((m) => m.id !== adminMessage.id)
      );
    }
  };

  const confirmBooking = async () => {
    let token = localStorage.getItem("access_token");
    try{
      const res = await fetch(``)
    }catch(err){
      console.error("Failed to confirm booking", err);
    }
  }




  return (
    <div className="flex h-[calc(100vh-80px)] flex-col rounded-2xl border border-[#2A2A2A] bg-[#161616]">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-[#2A2A2A] px-6 py-4">
        <Link
          href="/dashboard"
          className="rounded-lg bg-[#1F1F1F] p-2 hover:bg-[#2A2A2A]"
        >
          ←
        </Link>

        <h2 className="text-lg font-medium">
          Conversation #{conversationId}
        </h2>
        <button
          className="ml-auto rounded-lg bg-[#FF9F7A] px-4 py-2 text-black font-medium hover:opacity-90"
        >
          Confirm Booking
        </button>
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
