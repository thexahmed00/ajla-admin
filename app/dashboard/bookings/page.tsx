"use client";
import { useState, useEffect } from "react";
import BookingRow from "../components/BookingRow";

const TABS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchBookings(status: string) {
  try {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    const res = await fetch(`/api/bookings?status=${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    console.log("Fetched bookings:", json);
    setBookings(Array.isArray(json?.data?.bookings) ? json.data.bookings : []);
  } catch (err) {
    console.error("Failed fetching bookings", err);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    fetchBookings(activeTab);
  }, [activeTab]);
  if(loading){
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Bookings</h1>

      {/* TAB FILTER */}
      <div className="flex gap-2 mb-4">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium border transition-all
              ${activeTab === tab.key 
                ? "bg-primary text-white border-primary"
                : "bg-surface text-text-muted border-border hover:bg-primary/10 hover:text-primary"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-border/50">
            {loading ? (
              <tr><td className="p-6 text-center">Loading...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td className="p-6 text-center text-text-muted">No bookings found</td></tr>
            ) : (
              bookings?.map((booking: any, idx: number) => (
                <BookingRow key={booking.id}
                
            booking={booking} index={idx} 
            />
              ))
            )}
          </tbody>
        </table>
        
      </div>
    </div>
  );
}
