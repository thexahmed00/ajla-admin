"use client";
import VendorRow from "./VendorRow";
import ImageWithFallback from "./ImageWithFallback";
import { Vendor } from "../types/vendor";
import { Store, Star, CheckCircle, XCircle, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditVendorModal from "./EditVendorModal";
import VendorRowMobile from "./VendorRowMobile";
import Link from "next/link";




export default function VendorsTable({ vendors, deleteVendor }: { vendors: Vendor[]; deleteVendor: (id: number) => void }) {
  const [editVendor, setEditVendor] = useState<Vendor | null>(null);
  
  const vendorDelete = async (vendorId: number) => {
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
      deleteVendor(vendorId);
      // Tell parent to remove vendor from UI
      

    } catch (error) {
      console.error("Error deleting vendor:", error);
      alert("Failed to delete vendor");
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Desktop Table */}
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-surface-hover/30 text-text-muted border-b border-border">
          <tr>
            <th className="px-6 py-4 text-left font-medium uppercase text-xs tracking-wider">Vendor</th>
            <th className="px-6 py-4 text-left font-medium uppercase text-xs tracking-wider">Category</th>
            <th className="px-6 py-4 text-left font-medium uppercase text-xs tracking-wider">Rating</th>
            <th className="px-6 py-4 text-left font-medium uppercase text-xs tracking-wider">Status</th>
            <th className="px-6 py-4 text-left font-medium uppercase text-xs tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {vendors.map((vendor, index) => (
            <VendorRow key={vendor.id} vendor={vendor} index={index} onDelete={deleteVendor}  />
          ))}
        </tbody>
      </table>
      

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border/50">
  {vendors.map((vendor) => (
    <div
      key={vendor.id}
      className="p-4 flex gap-4 hover:bg-surface-hover/50 transition-colors"
    >
      <ImageWithFallback
        src={vendor.image}
        alt={vendor.name}
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        fallbackIcon={Store}
      />

      <div className="flex-grow min-w-0 space-y-2">
        {/* Title + Status */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-text-main truncate">
            {vendor.name}
          </h3>

          <span
            className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0
              ${
                vendor.status === "Active"
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}
          >
            {vendor.status === "Active" ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            {vendor.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-text-muted line-clamp-1">
          {vendor.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-text-dim">
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {vendor.category}
          </span>

          <span className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-yellow-500" />
            {vendor.rating}
          </span>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            href={`/dashboard/vendorinfo/${vendor.id}`}
            className="mobile-action-btn"
          >
            <Eye className="w-4 h-4" />
            
          </Link>

          <Link
            href={`vendors/addvendor/${vendor.id}`}
            className="mobile-action-btn"
          >
            <Pencil className="w-4 h-4" />
            
          </Link>

          <button
            onClick={() => vendorDelete(vendor.id)}
            className="action-btn-danger"
          >
            <Trash2 className="w-4 h-4" />
            
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
