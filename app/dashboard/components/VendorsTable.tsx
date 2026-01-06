import VendorRow from "./VendorRow";
import { Vendor } from "../types/vendor";

const vendors: Vendor[] = [
  {
    id: 1,
    name: "The Ritz-Carlton Riyadh",
    description: "Luxury 5-star hotel in the heart of Riyadh",
    category: "Hotels",
    rating: 4.9,
    status: "Active",
    image: "/hotel.jpg",
  },
  {
    id: 2,
    name: "PrivateJet Saudi",
    description: "Premium private aviation services",
    category: "Private Jets",
    rating: 5.0,
    status: "Active",
    image: "/jet.jpg",
  },
  {
    id: 3,
    name: "Nusr-Et Steakhouse",
    description: "World-famous luxury steakhouse experience",
    category: "Restaurants",
    rating: 4.8,
    status: "Active",
    image: "/restaurant.jpg",
  },
  {
    id: 4,
    name: "Royal Yacht Club",
    description: "Exclusive yacht charters and experiences",
    category: "Yacht Charters",
    rating: 4.7,
    status: "Active",
    image: "/yacht.jpg",
  },
  {
    id: 5,
    name: "Desert Rose Spa",
    description: "Traditional Arabian spa and wellness center",
    category: "Spa & Wellness",
    rating: 4.6,
    status: "Inactive",
    image: "/spa.jpg",
  },
];

export default function VendorsTable() {
  return (
    <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl overflow-hidden">

      {/* Desktop Table */}
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-[#121212] text-gray-400">
          <tr>
            <th className="px-6 py-4 text-left">Vendor</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Rating</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <VendorRow key={vendor.id} vendor={vendor} />
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-[#2A2A2A]">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="p-4 space-y-2">
            
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white">
                {vendor.name}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  vendor.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {vendor.status}
              </span>
            </div>

            <p className="text-sm text-gray-400">
              {vendor.description}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
              <span>
                <span className="text-gray-500">Category:</span>{" "}
                {vendor.category}
              </span>
              <span>
                <span className="text-gray-500">Rating:</span>{" "}
                ⭐ {vendor.rating}
              </span>
            </div>

            <div className="pt-2">
              <button className="text-sm text-[#FF7F41] hover:underline">
                View Details →
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
