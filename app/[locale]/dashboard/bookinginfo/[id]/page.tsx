"use client";

import Image from "next/image";
import { MessageSquare, Phone, Mail, Clock } from "lucide-react";
import { useParams } from "next/navigation";

type ApiResponse = {
    id: number;
    status: string;
    start_at_formatted: string;
    end_at_formatted: string;
    notes: string;
    user: {
        full_name: string;
        email: string;
        phone_number: string;
    };
    vendor: {
        name: string;
        category_slug: string;
        address: string;
        phone: string;
        hero_url: string;
    };
    request: {
        title: string;
        description: string;
        status: string;
    };
    conversation: {
        message_count: number;
        messages: {
            id: number;
            sender_type: "user" | "vendor";
            content: string;
            created_at: string;
        }[];
    };
};
export default function BookingDetails() {
    const data = {
        "id": 1,
        "status": "upcoming",
        "start_at": "2026-01-25T14:00:00",
        "end_at": "2026-01-25T16:00:00",
        "start_at_formatted": "25 Jan 2026, 02:00 PM",
        "end_at_formatted": "25 Jan 2026, 04:00 PM",
        "notes": "VIP guest - arrange airport pickup",
        "created_at": "2026-01-20T10:00:00",
        "created_by": 1,

        "user": {
            "id": 5,
            "email": "customer@example.com",
            "full_name": "John Doe",
            "phone_number": "+966501234567"
        },

        "vendor": {
            "id": 3,
            "name": "Luxury Restaurant",
            "category_slug": "dining",
            "address": "123 Main St, Riyadh",
            "phone": "+966512345678",
            "hero_url": "https://..."
        },

        "request": {
            "id": 10,
            "title": "Luxury Restaurant",
            "category_slug": "dining",
            "description": "I need a table for 4...",
            "status": "in_progress",
            "created_at": "2026-01-19T09:00:00",
            "updated_at": "2026-01-20T10:00:00"
        },

        "conversation": {
            "id": 10,
            "message_count": 5,
            "messages": [
                {
                    "id": 1,
                    "sender_id": 5,
                    "sender_type": "user",
                    "content": "I need a table for 4...",
                    "created_at": "2026-01-19T09:00:00"
                },
                
    ],
            "created_at": "2026-01-19T09:00:00"
        }
    }
    const { id } = useParams();
    console.log("Booking ID:", id);
    return (
        <div className="max-w-7xl mx-auto space-y-6">

            {/* HEADER */}
            <div className="rounded-xl border bg-surface p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">
                        {/* Booking #{data.id} */} Booking
                    </h1>
                    <p className="text-sm text-text-muted flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {/* {data.start_at_formatted} → {data.end_at_formatted} */}
                    </p>
                </div>

                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary w-fit">
                    {data.status.toUpperCase()}
                </span>
            </div>

            {/* USER + VENDOR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* USER */}
                <div className="rounded-xl border bg-surface p-5 space-y-2">
                    <h3 className="font-semibold text-text-main">Customer</h3>
                    <p className="font-medium">{data.user.full_name}</p>

                    <div className="flex items-center gap-2 text-sm text-text-muted">
                        <Mail className="w-4 h-4" />
                        {data.user.email}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-text-muted">
                        <Phone className="w-4 h-4" />
                        {data.user.phone_number}
                    </div>
                </div>

                {/* VENDOR */}
                <div className="rounded-xl border bg-surface p-5 flex gap-4">
                    {/* <Image
                        src={data.vendor.hero_url}
                        alt={data.vendor.name}
                        width={96}
                        height={96}
                        className="rounded-lg object-cover"
                    /> */}

                    <div className="space-y-1">
                        <h3 className="font-semibold text-text-main">
                            {data.vendor.name}
                        </h3>
                        <p className="text-sm text-text-muted capitalize">
                            {data.vendor.category_slug}
                        </p>
                        <p className="text-sm">{data.vendor.address}</p>
                        <p className="text-sm text-text-muted">{data.vendor.phone}</p>
                    </div>
                </div>
            </div>

            {/* REQUEST */}
            <div className="rounded-xl border bg-surface p-5 space-y-2">
                <h3 className="font-semibold text-text-main">Request</h3>
                <p className="font-medium">{data.request.title}</p>
                <p className="text-sm text-text-muted">
                    Status: {data.request.status}
                </p>
                <p className="text-sm">{data.request.description}</p>
            </div>

            {/* NOTES */}
            {data.notes && (
                <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-5">
                    <h3 className="font-semibold mb-1">Notes</h3>
                    <p className="text-sm">{data.notes}</p>
                </div>
            )}

            {/* CONVERSATION */}
            <div className="rounded-xl border bg-surface p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Conversation ({data.conversation.message_count})
                </h3>

                <div className="space-y-3">
                    {data.conversation.messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-[75%] rounded-lg px-4 py-2 text-sm ${msg.sender_type === "user"
                                    ? "bg-primary text-white ml-auto"
                                    : "bg-surface-hover"
                                }`}
                        >
                            <p>{msg.content}</p>
                            <span className="block mt-1 text-xs opacity-70">
                                {new Date(msg.created_at).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
