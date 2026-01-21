"use client";
import { Eye, Pencil, Trash2, CalendarDays, Clock, User } from "lucide-react";
import Link from "next/link";
interface BookingRowProps {
    booking: any;
    index: number;
}
export default function BookingRow({ booking, index }: BookingRowProps) {
    console.log("Booking", booking)


    function extractDateTime(isoString: string) {
        const date = new Date(isoString);

        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

        return {
            date: formattedDate, // 15 Jan 2026
            time: formattedTime, // 06:14 AM
        };
    }





    return (
        //     <tr
        //         className="
        //     group transition-all duration-300 
        //     hover:bg-surface-hover/60 hover:shadow-sm
        //     border-b border-border last:border-0
        //   "
        //         style={{
        //             animation: "fadeIn 0.45s ease-out forwards",
        //             opacity: 0
        //         }}
        //     >
        //         {/* Booking Info */}
        //         <td className="px-6 py-4">
        //             <div className="flex items-start gap-4">
        //                 <div className="min-w-0">
        //                     <p className="
        //           font-semibold text-text-main 
        //           group-hover:text-primary transition-colors truncate
        //         ">
        //                         Booking #{booking?.id}
        //                     </p>

        //                     <div className="flex items-center gap-4 mt-1 text-xs text-text-muted">
        //                         <span className="flex items-center gap-1">
        //                             <CalendarDays className="w-3.5 h-3.5" />
        //                             {   extractDateTime(booking?.created_at).date  }
        //                         </span>

        //                         <span className="flex items-center gap-1">
        //                             <Clock className="w-3.5 h-3.5" />
        //                             {   extractDateTime(booking?.created_at).time  }
        //                         </span>

        //                         {/* <span className="flex items-center gap-1">
        //                             <User className="w-3.5 h-3.5" />
        //                             Mustafa Khan
        //                         </span> */}
        //                     </div>
        //                 </div>
        //             </div>
        //         </td>

        //         {/* Status */}
        //         <td className="px-6 py-4">
        //             <span className="
        //       inline-flex items-center gap-1.5
        //       px-3 py-1.5 rounded-full text-xs font-medium
        //       bg-green-500/10 text-green-500
        //       border border-green-500/20
        //     ">
        //                 {booking?.status}
        //             </span>
        //         </td>

        //         {/* Amount */}
        //         {/* <td className="px-6 py-4 text-text-main font-medium">
        //             ₹12,000
        //         </td> */}

        //         {/* Actions */}
        //         <td className="px-6 py-4">
        //             <div className="
        //       flex gap-2
        //       opacity-0 group-hover:opacity-100
        //       transition-all duration-300
        //     ">
        //                 {/* View */}
        //                 <Link
        //                 // href={`/dashboard/bookinginfo/${booking?.id}`}
        //                 href={""}
        //                     className="
        //           w-9 h-9 flex items-center justify-center
        //           rounded-lg border border-border
        //           hover:border-primary/40 hover:bg-primary/10
        //           text-text-muted hover:text-primary
        //           transition-all duration-300
        //         "
        //                     title="View"
        //                 >
        //                     <Eye className="w-4 h-4" />
        //                 </Link>

        //                 {/* Edit */}
        //                 {/* <Link
        //                     href="/bookings/12345"
        //                     className="
        //           w-9 h-9 flex items-center justify-center
        //           rounded-lg border border-border
        //           hover:border-primary/40 hover:bg-primary/10
        //           text-text-muted hover:text-primary
        //           transition-all duration-300
        //         "
        //                     title="Edit Booking"
        //                 >
        //                     <Pencil className="w-4 h-4" />
        //                 </Link> */}

        //                 {/* Delete */}
        //                 <button
        //                     className="
        //           w-9 h-9 flex items-center justify-center
        //           rounded-lg
        //           bg-red-500/10 border border-red-500/20
        //           hover:bg-red-500/20
        //           text-red-500
        //           transition-all duration-300
        //         "
        //                     title="Delete Booking"
        //                 >
        //                     <Trash2 className="w-4 h-4" />
        //                 </button>
        //             </div>
        //         </td>
        //     </tr>
        <>
            {/* ================= DESKTOP ROW ================= */}
            <tr
                className="hidden md:table-row group transition-all duration-300
                   hover:bg-surface-hover/60 border-b border-border"
                style={{
                    animation: "fadeIn 0.45s ease-out forwards",
                    opacity: 0,
                }}
            >
                {/* Booking Info */}
                <td className="px-6 py-4">
                    <p className="font-semibold text-text-main group-hover:text-primary">
                        Booking #{booking.id}
                    </p>
                    <div className="flex gap-4 mt-1 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" />
                            {extractDateTime(booking.created_at).date}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {extractDateTime(booking.created_at).time}
                        </span>
                    </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium
                           bg-green-500/10 text-green-500 border border-green-500/20">
                        {booking.status}
                    </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <Link
                            href=""
                            className="w-9 h-9 flex items-center justify-center rounded-lg
                         border border-border hover:border-primary/40
                         hover:bg-primary/10 text-text-muted hover:text-primary"
                        >
                            <Eye className="w-4 h-4" />
                        </Link>

                        <button
                            className="w-9 h-9 flex items-center justify-center rounded-lg
                         bg-red-500/10 hover:bg-red-500/20
                         text-red-500 border border-red-500/20"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr>

            {/* ================= MOBILE ROW ================= */}
            <tr className="md:hidden">
                <td colSpan={3} className="p-4">
                    <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-text-main">
                                    Booking #{booking.id}
                                </p>
                                <div className="flex gap-3 mt-1 text-xs text-text-muted">
                                    <span className="flex items-center gap-1">
                                        <CalendarDays className="w-3.5 h-3.5" />
                                        {extractDateTime(booking.created_at).date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {extractDateTime(booking.created_at).time}
                                    </span>
                                </div>
                            </div>

                            <span className="px-2 py-1 rounded-full text-xs font-medium
                               bg-green-500/10 text-green-500 border border-green-500/20">
                                {booking.status}
                            </span>
                        </div>

                        {/* Actions — ALWAYS VISIBLE */}
                        <div className="flex gap-2 pt-3 border-t border-border">
                            <Link
                                href=""
                                className="flex-1 flex items-center justify-center gap-2 py-2
                           rounded-lg border border-border
                           hover:bg-primary/10 text-text-muted hover:text-primary"
                            >
                                <Eye className="w-4 h-4" />
                                View
                            </Link>

                            <button
                                className="flex-1 flex items-center justify-center gap-2 py-2
                           rounded-lg bg-red-500/10 hover:bg-red-500/20
                           text-red-500 border border-red-500/20"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </>

    );
}
