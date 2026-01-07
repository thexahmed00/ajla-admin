"use client";
import Link from "next/link";
import StatCard from "./components/StatCard";
import { Conversation } from "./types/conversation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdmin } from "../lib/auth";
import { fetchDashboardStats } from "../lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);





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

  

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/login");
    }
  }, []);

    useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading dashboard...</p>;
  }





  return (
    <div className="w-full">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-1">
        Dashboard
      </h1>
      <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">
        Welcome to AJLA Admin Panel
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
         <StatCard title="Total Conversations" value={stats.totalConversations} />
      <StatCard title="Active Vendors" value={stats.activeVendors} />
      <StatCard title="Service Categories" value={stats.serviceCategories} />
      <StatCard title="Availability" value={stats.availability} />
      </div>

      {/* Conversations */}
      <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616]">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-[#2A2A2A]">
          <h2 className="text-base md:text-lg font-medium">
            Recent Conversations
          </h2>
          <Link
            href="/conversations"
            className="text-sm text-[#FF7F41] hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="divide-y divide-[#2A2A2A]">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/dashboard/conversations/${conv.id}`}
              className="block px-4 md:px-6 py-3 md:py-4 hover:bg-[#1E1E1E] transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <h4 className="font-medium text-white text-sm md:text-base">
                    {conv.userName}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 truncate">
                    {conv.lastMessage}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1 md:gap-2 shrink-0">
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
    </div>
  );
}
