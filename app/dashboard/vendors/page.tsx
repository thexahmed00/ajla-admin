"use client";
import VendorsToolbar from "../components/VendorsToolbar";
import VendorsTable from "../components/VendorsTable";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchVendors } from "@/app/lib/vendors";
import { Vendor } from "../types/vendor";

export default function VendorsPage() {

    const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVendors() {
      try {
        const data = await fetchVendors();

        const mapped: Vendor[] = data.vendors.map((v: any) => ({
          id: v.id,
          name: v.name,
          description: v.short_description,
          category: v.category_name,
          rating: v.rating,
          status: "Active", // API doesn’t give status yet
          image: v.thumbnail_url,
        }));
        console.log("mapped",mapped)
        setVendors(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadVendors();
  }, []);

  return (
    <div className="space-y-6 overflow-x-hidden">
      
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-poppins text-2xl md:text-3xl mb-1">
            Vendors
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Manage restaurants, hotels, jets, and more
          </p>
        </div>

        <Link
          href="vendors/addvendor"
          className="inline-flex items-center justify-center w-full md:w-auto px-5 py-3 md:py-2 rounded-lg bg-[#FF7F41] text-black font-medium hover:opacity-90"
        >
          + Add Vendor
        </Link>
      </div>

      {/* Toolbar */}
      <VendorsToolbar />

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading vendors...</p>
      ) : (
        <VendorsTable vendors={vendors} />
      )}

    </div>
  );
}
