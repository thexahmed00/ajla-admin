"use client";
import VendorsToolbar from "../components/VendorsToolbar";
import VendorsTable from "../components/VendorsTable";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchVendors } from "@/app/lib/vendors";
import { Vendor } from "../types/vendor";
import { Plus, Store } from "lucide-react";

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
          status: "Active",
          image: v.thumbnail_url,
        }));
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
    <div className="space-y-6 overflow-x-hidden max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10 hidden md:flex">
            <Store className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-poppins font-bold text-2xl md:text-3xl text-text-main">
              Vendors
            </h1>
            <p className="text-text-muted text-sm md:text-base mt-1">
              Manage restaurants, hotels, jets, and more
            </p>
          </div>
        </div>

        <Link
          href="vendors/addvendor"
          className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl 
            bg-gradient-to-r from-primary to-primary-hover text-surface font-semibold 
            hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
            active:translate-y-0
            transition-all duration-200 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
          Add Vendor
        </Link>
      </div>

      {/* Toolbar */}
      <div>
        <VendorsToolbar />
      </div>

      {/* Table */}
      <div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-text-muted text-sm">Loading vendors...</p>
          </div>
        ) : vendors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-surface rounded-xl border border-border">
            <div className="p-4 rounded-full bg-surface-hover">
              <Store className="w-8 h-8 text-text-dim" />
            </div>
            <div className="text-center">
              <p className="text-text-main font-medium">No vendors found</p>
              <p className="text-text-muted text-sm mt-1">Add your first vendor to get started</p>
            </div>
          </div>
        ) : (
          <VendorsTable vendors={vendors} />
        )}
      </div>
    </div>
  );
}
