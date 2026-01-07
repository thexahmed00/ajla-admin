import { Vendor } from "../types/vendor";
import {
  Star,
  CheckCircle,
  XCircle,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";

export default function VendorRow({ vendor }: { vendor: Vendor }) {
  return (
    <tr className="border-t border-[#2A2A2A] hover:bg-[#222] transition">
      
      {/* Vendor info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-12 h-12 rounded-lg object-cover"
          />

          <div>
            <p className="font-medium">{vendor.name}</p>
            <p className="text-xs text-gray-400">
              {vendor.description}
            </p>
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
        <span className="flex items-center gap-1 text-yellow-400">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span className="text-white">{vendor.rating}</span>
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {vendor.status === "Active" ? (
          <span className="px-3 py-1 rounded-full text-xs bg-green-900 text-green-300 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Active
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs bg-red-900 text-red-300 flex items-center gap-1">
            <XCircle className="w-4 h-4" />
            Inactive
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#2A2A2A] hover:bg-[#2A2A2A]">
            <Eye className="w-4 h-4 text-gray-300" />
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#2A2A2A] hover:bg-[#2A2A2A]">
            <Pencil className="w-4 h-4 text-gray-300" />
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-600 hover:bg-red-700">
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </td>

    </tr>
  );
}
