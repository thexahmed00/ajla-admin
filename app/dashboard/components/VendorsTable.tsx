import VendorRow from "./VendorRow";
import { Vendor } from "../types/vendor";

export default function VendorsTable({ vendors }: { vendors: Vendor[] }) {
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
              <h3 className="font-medium text-white">{vendor.name}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                {vendor.status}
              </span>
            </div>

            <p className="text-sm text-gray-400">{vendor.description}</p>

            <div className="flex gap-4 text-xs text-gray-400">
              <span>Category: {vendor.category}</span>
              <span>⭐ {vendor.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
