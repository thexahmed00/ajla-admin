import { Vendor } from "../types/vendor";

export default function VendorRow({ vendor }: { vendor: Vendor }) {
  return (
    <tr className="border-t border-[#2A2A2A] hover:bg-[#222] transition">
      
      {/* Vendor info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#2A2A2A]" />
          <div>
            <p className="font-medium">{vendor.name}</p>
            <p className="text-xs text-gray-400">{vendor.description}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4">
        <span className="px-3 py-1 rounded-full text-xs bg-[#2A1A12] text-[#FF7F41]">
          {vendor.category}
        </span>
      </td>

      {/* Rating */}
      <td className="px-6 py-4">
        <span className="flex items-center gap-1">
          ⭐ <span>{vendor.rating}</span>
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            vendor.status === "Active"
              ? "bg-green-900 text-green-300"
              : "bg-red-900 text-red-300"
          }`}
        >
          {vendor.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-lg border border-[#2A2A2A] hover:bg-[#2A2A2A]">
            👁
          </button>
          <button className="w-9 h-9 rounded-lg border border-[#2A2A2A] hover:bg-[#2A2A2A]">
            ✏️
          </button>
          <button className="w-9 h-9 rounded-lg bg-red-600 hover:bg-red-700">
            🗑
          </button>
        </div>
      </td>
    </tr>
  );
}
