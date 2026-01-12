"use client";
import { Eye, Pencil, Trash2, CalendarDays, Clock, User } from "lucide-react";
import Link from "next/link";
interface BookingRowProps {
        booking: any;
        index: number;
    }
export default function BookingRow({ booking, index }: BookingRowProps) {
    
    return (
        <tr
            className="
        group transition-all duration-300 
        hover:bg-surface-hover/60 hover:shadow-sm
        border-b border-border last:border-0
      "
            style={{
                animation: "fadeIn 0.45s ease-out forwards",
                opacity: 0
            }}
        >
            {/* Booking Info */}
            <td className="px-6 py-4">
                <div className="flex items-start gap-4">
                    <div className="min-w-0">
                        <p className="
              font-semibold text-text-main 
              group-hover:text-primary transition-colors truncate
            ">
                            Booking #12345
                        </p>

                        <div className="flex items-center gap-4 mt-1 text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                                <CalendarDays className="w-3.5 h-3.5" />
                                04 Jan 2026
                            </span>

                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                7:30 PM
                            </span>

                            <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                Mustafa Khan
                            </span>
                        </div>
                    </div>
                </div>
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <span className="
          inline-flex items-center gap-1.5
          px-3 py-1.5 rounded-full text-xs font-medium
          bg-green-500/10 text-green-500
          border border-green-500/20
        ">
                    Confirmed
                </span>
            </td>

            {/* Amount */}
            <td className="px-6 py-4 text-text-main font-medium">
                ₹12,000
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <div className="
          flex gap-2
          opacity-0 group-hover:opacity-100
          transition-all duration-300
        ">
                    {/* View */}
                    <button
                        className="
              w-9 h-9 flex items-center justify-center
              rounded-lg border border-border
              hover:border-primary/40 hover:bg-primary/10
              text-text-muted hover:text-primary
              transition-all duration-300
            "
                        title="View"
                    >
                        <Eye className="w-4 h-4" />
                    </button>

                    {/* Edit */}
                    <Link
                        href="/bookings/12345"
                        className="
              w-9 h-9 flex items-center justify-center
              rounded-lg border border-border
              hover:border-primary/40 hover:bg-primary/10
              text-text-muted hover:text-primary
              transition-all duration-300
            "
                        title="Edit Booking"
                    >
                        <Pencil className="w-4 h-4" />
                    </Link>

                    {/* Delete */}
                    <button
                        className="
              w-9 h-9 flex items-center justify-center
              rounded-lg
              bg-red-500/10 border border-red-500/20
              hover:bg-red-500/20
              text-red-500
              transition-all duration-300
            "
                        title="Delete Booking"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
