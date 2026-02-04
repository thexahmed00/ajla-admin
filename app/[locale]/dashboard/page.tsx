"use client";
import Link from "next/link";
import StatCard from "./components/StatCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdmin } from "../lib/auth";
import { fetchDashboardStats } from "../lib/api";
import { MessageSquare, Users, Grid3X3, Clock, ChevronRight } from "lucide-react";
import PromoForm from "./components/HomePageBanner";
import HomePageBannerModal from "./components/BannerFormModal";
import { Plus } from "lucide-react";


type ConversationApi = {
  id: number;
  request_id: number;
  title: string;
  description: string;
  user_id: number;
  vendor_id: number | null;
  vendor_name: string | null;
  vendor_image_url: string | null;
  created_at: string;
  messages: Array<{ read: boolean }>;
};

type ConversationUI = {
  id: string;
  userName: string;
  lastMessage: string;
  updatedAt: string;
  unreadCount: number;
};

type DashboardStats = {
  totalConversations: string;
  activeVendors: string;
  serviceCategories: string;
  availability: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [conversationsData, setConversationsData] = useState<ConversationUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [convoCount, setConvoCount] = useState<number>(0);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin()) router.replace("/login");
  }, []);

  useEffect(() => {
    async function loadStats() {
      let token = localStorage.getItem("access_token")
      try {
        const data = await fetchDashboardStats();
        const res = await fetch("/api/conversations?skip=0&limit=20",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        let convoData = await res.json();
        console.log("convoData", convoData);
        setConvoCount(convoData.total || 0)

        const conversations: ConversationUI[] = (convoData.conversations || []).map(
          (item: ConversationApi) => ({
            id: String(item.id),
            userName: item.vendor_name ?? item.title,
            lastMessage: item.description,
            updatedAt: new Date(item.created_at).toLocaleString(),
            unreadCount: item.messages?.filter((m: any) => !m.read).length ?? 0,
          })
        );

        setStats(data);
        setConversationsData(conversations);
      } catch (error) {
        console.error(error);

        setStats({
          totalConversations: "24",
          activeVendors: "12",
          serviceCategories: "6",
          availability: "98%",
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
      <div className="flex items-center gap-3 mb-4">
  <button
    onClick={() => setBannerOpen(true)}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
  >
    <Plus className="w-4 h-4" />
    Add Home Banner
  </button>
</div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard title="Total Conversations" value={convoCount ?? "0"} icon={MessageSquare} />
        <StatCard title="Active Vendors" value={stats?.activeVendors ?? "0"} icon={Users} />
        <StatCard title="Service Categories" value={stats?.serviceCategories ?? "0"} icon={Grid3X3} />
        <StatCard title="Availability" value={stats?.availability ?? "0%"} icon={Clock} />
      </div>
      

      {/* Conversations */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-border bg-surface-hover/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-text-main">
              Recent Conversations
            </h2>
          </div>

          <Link href="/dashboard/conversations" className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors group">
            <span>View All</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="divide-y divide-border/50">
          {conversationsData.map((conv) => (
            <Link
              key={conv.id}
              href={`/dashboard/conversations`}
              className="block px-5 md:px-6 py-4 hover:bg-surface-hover/50 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-sm font-semibold text-primary">
                      {conv.userName?.charAt(0)}
                    </span>
                  </div>

                  <div className="min-w-0 space-y-1">
                    <h4 className="font-medium text-text-main text-sm md:text-base group-hover:text-primary transition-colors truncate">
                      {conv.userName}
                    </h4>

                    <p className="text-xs md:text-sm text-text-muted truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xs text-text-dim">{conv.updatedAt}</span>

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
      <HomePageBannerModal
  open={bannerOpen}
  onClose={() => setBannerOpen(false)}
/>

    </div>
  );
}
