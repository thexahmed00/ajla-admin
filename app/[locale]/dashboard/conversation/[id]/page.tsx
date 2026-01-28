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
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);

  const conversationId = id; // <-- Use dynamic id from URL

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
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
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
  if (!bookingNotes.trim()) return;

  let token = localStorage.getItem("access_token");
  setConfirmLoading(true);
  try {
    const res = await fetch(
      `/api/conversations/${conversationId}/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            end_at: new Date().toISOString(),
          notes: bookingNotes,
          start_at: new Date().toISOString(),

        }),
      }
    );

    if (!res.ok) throw new Error("Failed to confirm booking");
    console.log("Booking confirmed successfully", res);
    setIsConfirmOpen(false);
    setBookingNotes("");
  } catch (err) {
    console.error("Failed to confirm booking", err);
  } finally {
    setConfirmLoading(false);
  }
};

const fetchConversation = async () => {
  const token = localStorage.getItem("access_token");

  const res = await fetch("/api/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      conversation_id: conversationId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch conversation");
  }

  return res.json();
};


useEffect(() => {
  if (!conversationId) return;

  fetchConversation()
    .then((data) => {
      const formattedMessages = data.messages.map((msg: any) => ({
        id: msg.id.toString(),
        sender: msg.sender_type === "admin" ? "admin" : "user",
        text: msg.content,
        time: new Date(msg.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setMessages(formattedMessages);
    })
    .catch(console.error);
}, [conversationId]);







  return (
    <div className="flex h-[calc(100vh-80px)] flex-col rounded-2xl border border-[#2A2A2A] bg-[#161616]">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-[#2A2A2A] px-6 py-4">
        <Link
          href="/dashboard/conversations"
          className="rounded-lg bg-[#1F1F1F] p-2 hover:bg-[#2A2A2A]"
        >
          ←
        </Link>

        <h2 className="text-lg font-medium">
          Conversation #{conversationId}
        </h2>
        <button
        onClick={() => setIsConfirmOpen(true)}
          className="ml-auto rounded-lg bg-[#FF9F7A] px-4 py-2 text-black font-medium hover:opacity-90 cursor-pointer"
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
      {isConfirmOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="w-full max-w-md rounded-2xl bg-[#161616] border border-[#2A2A2A] p-6">
      <h3 className="mb-4 text-lg font-medium">
        Confirm Booking
      </h3>

      <textarea
        value={bookingNotes}
        onChange={(e) => setBookingNotes(e.target.value)}
        placeholder="Enter booking notes..."
        className="w-full rounded-xl bg-[#1F1F1F] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
        rows={4}
      />

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setIsConfirmOpen(false)}
          className="rounded-lg bg-[#2A2A2A] px-4 py-2 text-sm"
        >
          Cancel
        </button>

        <button
          onClick={confirmBooking}
          disabled={confirmLoading}
          className="rounded-lg bg-[#FF9F7A] px-4 py-2 text-sm text-black hover:opacity-90 disabled:opacity-60 cursor-pointer"
        >
          {confirmLoading ? "Confirming..." : "Confirm"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
