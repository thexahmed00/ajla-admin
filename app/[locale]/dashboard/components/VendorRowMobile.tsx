"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  vendor: any;
  deleteVendor: (id: string | number) => void;
  onDelete?: (id: number) => void;
}

export default function VendorRowMobile({ vendor, onDelete }: Props) {
    const deleteVendor = async (vendorId: number) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://44.206.101.8/api/v1/admin/services/vendors/${vendorId}?hard_delete=false`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      console.log("Vendor deleted successfully");

      // Tell parent to remove vendor from UI
      onDelete?.(vendorId);

    } catch (error) {
      console.error("Error deleting vendor:", error);
      alert("Failed to delete vendor");
    }
  };
  return (
    <div className="md:hidden border border-border rounded-xl p-4 bg-surface">
      {/* Vendor Name */}
      <p className="font-medium text-text-main truncate">
        {vendor.name}
      </p>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-3">
        <Link
          href={`/dashboard/vendorinfo/${vendor.id}`}
          className="mobile-action-btn"
        >
          <Eye className="w-4 h-4" />
          View
        </Link>

        <Link
          href={`vendors/addvendor/${vendor.id}`}
          className="mobile-action-btn"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Link>

        <button
          className="mobile-action-btn-danger"
          onClick={() => deleteVendor(vendor.id)}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
