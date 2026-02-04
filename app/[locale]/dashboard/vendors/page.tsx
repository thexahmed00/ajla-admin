"use client";

import VendorsToolbar from "../components/VendorsToolbar";
import VendorsTable from "../components/VendorsTable";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Vendor } from "../types/vendor";
import { Plus, Store } from "lucide-react";
import { fetchVendors } from "@/app/[locale]/lib/vendors";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const [slug, setSlug] = useState("");
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const LIMIT = 20;

  const handleDeleteVendor = (id: number) => {
    setVendors(prev => prev.filter(v => v.id !== id));
  };

  // LOAD VENDORS
  useEffect(() => {
    let ignore = false;

    async function loadVendors() {
      try {
        setLoading(true);
        const data = slug
          ? await fetchVendors(slug, skip, LIMIT)
          : await fetchVendors(undefined, skip, LIMIT);

        if (ignore) return;

        const mapped: Vendor[] = data.vendors.map((v: { id: number; name: string; short_description: string; category_name: string; rating: number; thumbnail_url: string }) => ({
          id: v.id,
          name: v.name,
          description: v.short_description,
          category: v.category_name,
          rating: v.rating,
          status: "Active",
          image: v.thumbnail_url,
        }));

        // Append if not first page — otherwise replace
        setVendors(prev => (skip === 0 ? mapped : [...prev, ...mapped]));

        // Stop if less than 20 returned
        if (mapped.length < LIMIT) setHasMore(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load vendors";
        console.error(errorMessage, err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadVendors();
    return () => { ignore = true };
  }, [slug, skip]);

  // RESET WHEN CATEGORY CHANGES
  useEffect(() => {
    setVendors([]);
    setSkip(0);
    setHasMore(true);
  }, [slug]);

  // INTERSECTION OBSERVER
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        setSkip(prev => prev + LIMIT);
      }
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef.current, loading, hasMore]);

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
          active:translate-y-0 transition-all duration-200 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
          Add Vendor
        </Link>
      </div>

      {/* Toolbar */}
      <VendorsToolbar onCategoryChange={setSlug} />

      {/* Table */}
      <VendorsTable vendors={vendors} deleteVendor={handleDeleteVendor} />

      {/* Infinite Scroll Loader */}
      {hasMore && (
        <div ref={loaderRef} className="py-10 flex justify-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
