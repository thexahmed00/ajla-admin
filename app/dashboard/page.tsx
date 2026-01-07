"use client";
import Link from "next/link";
import StatCard from "./components/StatCard";
import { Conversation } from "./types/conversation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdmin } from "../lib/auth";
import { fetchDashboardStats } from "../lib/api";
import { MessageSquare, Users, Grid3X3, Clock, ChevronRight } from "lucide-react";

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
        // Set fallback stats if API fails
        setStats({
          totalConversations: "24",
          activeVendors: "12",
          serviceCategories: "6",
          availability: "98%"
        });
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-text-muted text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-2">
          Dashboard
        </h1>
        <p className="text-sm md:text-base text-text-muted">
          Welcome to AJLA Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard 
          title="Total Conversations" 
          value={stats?.totalConversations ?? "0"} 
          icon={MessageSquare}
        />
        <StatCard 
          title="Active Vendors" 
          value={stats?.activeVendors ?? "0"}
          icon={Users}
        />
        <StatCard 
          title="Service Categories" 
          value={stats?.serviceCategories ?? "0"}
          icon={Grid3X3}
        />
        <StatCard 
          title="Availability" 
          value={stats?.availability ?? "0%"}
          icon={Clock}
        />
      </div>

      {/* Conversations Section */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-border bg-surface-hover/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-text-main">
              Recent Conversations
            </h2>
          </div>
          <Link
            href="/dashboard/conversations/1"
            className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors group"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Conversation List */}
        <div className="divide-y divide-border/50">
          {conversations.map((conv, index) => (
            <Link
              key={conv.id}
              href={`/dashboard/conversations/${conv.id}`}
              className="block px-5 md:px-6 py-4 hover:bg-surface-hover/50 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Avatar & Info */}
                <div className="flex items-start gap-3 min-w-0">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-sm font-semibold text-primary">
                      {conv.userName.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Text content */}
                  <div className="min-w-0 space-y-1">
                    <h4 className="font-medium text-text-main text-sm md:text-base group-hover:text-primary transition-colors truncate">
                      {conv.userName}
                    </h4>
                    <p className="text-xs md:text-sm text-text-muted truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xs text-text-dim">
                    {conv.updatedAt}
                  </span>

                  {conv.unreadCount > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-surface animate-pulse">
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
