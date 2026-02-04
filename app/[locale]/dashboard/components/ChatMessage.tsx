import { Message } from "../types/message";

export default function ChatMessage({ message }: { message: Message }) {
  const isAdmin = message.sender === "admin";

  return (
    <div
      className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs rounded-2xl px-4 py-3 text-sm
          ${
            isAdmin
              ? "bg-[#FF9F7A] text-black rounded-br-none"
              : "bg-[#1F1F1F] text-white rounded-bl-none"
          }`}
      >
        <p>{message.text}</p>
        <span className="mt-1 block text-[10px] opacity-70 text-right">
          {message.time}
        </span>
      </div>
    </div>
  );
}
