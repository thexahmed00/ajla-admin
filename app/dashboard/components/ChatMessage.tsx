import { Message } from "../types/message";

export default function ChatMessage({ message }: { message: Message }) {
  const isAdmin = message.sender === "admin";

  return (
    <div
      className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed
          ${
            isAdmin
              ? "bg-[#FF9F7A] text-black rounded-br-sm"
              : "bg-[#1F1F1F] text-white rounded-bl-sm"
          }`}
      >
        <p>{message.text}</p>
        <span className="mt-2 block text-xs opacity-70">
          {message.time}
        </span>
      </div>
    </div>
  );
}
