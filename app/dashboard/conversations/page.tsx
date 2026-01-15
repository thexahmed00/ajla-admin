"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdmin } from "../../lib/auth";
import { MessageSquare, Users, Grid3X3, Clock, ChevronRight } from "lucide-react";

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
  messages: any[];
};

type ConversationUI = {
  id: string;
  userName: string;
  lastMessage: string;
  updatedAt: string;
  unreadCount: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [conversationsData, setConversationsData] = useState<ConversationUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [convoCount, setConvoCount] = useState<number>(0);
  useEffect(() => {
    if (!isAdmin()) router.replace("/login");
  }, []);

  useEffect(() => {
    async function loadStats() {
      let token = localStorage.getItem("access_token")
      try {
        // const data = await fetchDashboardStats();
        const res = await fetch("/api/conversations?skip=0&limit=20",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        let convoData = await res.json();
        console.log("convoData", convoData);
        setConvoCount(convoData.total)

        const conversations: ConversationUI[] = convoData.conversations.map(
          (item: ConversationApi) => ({
            id: String(item.id),
            userName: item.vendor_name ?? item.title,
            lastMessage: item.description,
            updatedAt: new Date(item.created_at).toLocaleString(),
            unreadCount: item.messages?.filter((m: any) => !m.read).length ?? 0,
          })
        );

        // setStats(data);
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
          Conversations
        </h1>
        
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

          <Link href="/dashboard/conversations/1" className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors group">
            <span>View All</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="divide-y divide-border/50">
          {conversationsData.map((conv) => (
            <Link
              key={conv.id}
              href={`/dashboard/conversation/${conv.id}`}
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
    </div>
  );
}
