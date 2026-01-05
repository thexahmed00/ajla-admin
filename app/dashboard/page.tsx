import Link from "next/link";
import StatCard from "./components/StatCard";
import { Conversation } from "./types/conversation";

export default function DashboardPage() {
  const conversations: Conversation[] = [
    {
      id: "1",
      userName: "Cafe Bonjour",
      lastMessage: "Hi, I want to update my menu items.",
      unreadCount: 2,
      updatedAt: "2 min ago",
    },
    {
      id: "2",
      userName: "Azure Rentals",
      lastMessage: "Do you provide bulk car listings?",
      unreadCount: 0,
      updatedAt: "10 min ago",
    },
    {
      id: "3",
      userName: "Royal Jets",
      lastMessage: "Please share pricing details.",
      unreadCount: 1,
      updatedAt: "1 hour ago",
    },
    {
      id: "4",
      userName: "Palm Resort",
      lastMessage: "Thank you for the confirmation!",
      unreadCount: 0,
      updatedAt: "Yesterday",
    },
    {
      id: "5",
      userName: "Palm Resort",
      lastMessage: "Thank you for the confirmation!",
      unreadCount: 0,
      updatedAt: "Yesterday",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold mb-1">Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Welcome to AJLA Admin Panel
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Conversations" value="156" />
        <StatCard title="Active Vendors" value="48" />
        <StatCard title="Service Categories" value="8" />
        <StatCard title="Availability" value="24/7" />
      </div>

      {/* Conversations Card */}
      <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
          <h2 className="text-lg font-medium">Recent Conversations</h2>
          <Link
            href="/conversations"
            className="text-sm text-[#FF7F41] hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* List */}
        <div className="divide-y divide-[#2A2A2A]">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/dashboard/conversations/${conv.id}`}
              className="block px-6 py-4 hover:bg-[#1E1E1E] transition"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-white">
                    {conv.userName}
                  </h4>
                  <p className="text-sm text-gray-400 truncate max-w-md">
                    {conv.lastMessage}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-gray-500">
                    {conv.updatedAt}
                  </span>

                  {conv.unreadCount > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#FF7F41] px-2 text-xs font-medium text-black">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
