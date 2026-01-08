"use client";
import VendorRow from "./VendorRow";
import ImageWithFallback from "./ImageWithFallback";
import { Vendor } from "../types/vendor";
import { Store, Star, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import EditVendorModal from "./EditVendorModal";

export default function VendorsTable({ vendors }: { vendors: Vendor[] }) {
  const [editVendor, setEditVendor] = useState<Vendor | null>(null);

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
            <VendorRow key={vendor.id} vendor={vendor} index={index}  />
          ))}
        </tbody>
      </table>
      {/* {editVendor && (
  <EditVendorModal
    vendor={editVendor}
    onClose={() => setEditVendor(null)}
    // refresh={loadVendors}
  />
)} */}

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border/50">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="p-4 flex gap-4 hover:bg-surface-hover/50 transition-colors">
            <ImageWithFallback
              src={vendor.image}
              alt={vendor.name}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              fallbackIcon={Store}
            />
            <div className="space-y-2 flex-grow min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium text-text-main truncate">{vendor.name}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 ${vendor.status === 'Active'
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                  {vendor.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {vendor.status}
                </span>
              </div>

              <p className="text-sm text-text-muted line-clamp-1">{vendor.description}</p>

              <div className="flex items-center gap-4 text-xs text-text-dim">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                  {vendor.category}
                </span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-3 h-3 fill-yellow-500" />
                  {vendor.rating}
                </span>
              </div>
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}
