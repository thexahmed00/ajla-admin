"use client";

import { Star, Phone, Globe, MapPin, MessageCircle } from "lucide-react";
import { use, useEffect, useState } from "react";
import JetsMeta from "../../components/vendorinfo/JetsMeta";
import { RestaurantMeta } from "../../components/vendorinfo/RestaurantsMeta";
import { HotelMeta } from "../../components/vendorinfo/HotelsMeta";
import { FlightsMeta } from "../../components/vendorinfo/FlightsMeta";
import { CarDriverMeta } from "../../components/vendorinfo/CarDriverMeta";
import { CarRentMeta } from "../../components/vendorinfo/CarRentingMeta";
import { useParams } from "next/navigation";

export default function VendorDetailsUI() {
    const {id} = useParams();
const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchVendor = async () => {
      try {
        const res = await fetch(
          `http://44.206.101.8/api/v1/services/vendors/${id}`,
          { cache: "no-store" }        // ensure fresh data
        );

        if (!res.ok) throw new Error("Failed to fetch vendor");

        const data = await res.json();
        setVendor(data?.data || data);  // adjust if API wraps result
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading vendor…</div>;
  if (!vendor) return <div className="p-10 text-center">Vendor not found</div>;

  




  return (
    <div className="max-w-6xl mx-auto py-10 space-y-10">

      {/* HERO */}
      {vendor?.hero_images?.length > 0 && (
        <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-lg border bg-secondary">
          <img
            src={vendor.hero_images[0]}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
            alt={vendor.name}
          />
        </div>
      )}

      {/* TOP SECTION */}
      <div className="bg-card border rounded-3xl shadow-md p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            {vendor.name}
          </h1>

          <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">
            {vendor.category_name}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <Star className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-lg">
              {vendor.rating || "N/A"}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 flex-wrap">
          {vendor.phone && (
            <a
              href={`tel:${vendor.phone}`}
              className="px-5 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center gap-2 hover:bg-primary hover:text-white transition"
            >
              <Phone size={18} /> Call
            </a>
          )}

          {vendor.whatsapp && (
            <a
              href={`https://wa.me/${vendor.whatsapp}`}
              target="_blank"
              className="px-5 py-2.5 rounded-xl bg-green-500/10 text-green-600 border border-green-500/30 flex items-center gap-2 hover:bg-green-600 hover:text-white transition"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          )}

          {vendor.website && (
            <a
              href={
                vendor.website.startsWith("http")
                  ? vendor.website
                  : `https://${vendor.website}`
              }
              target="_blank"
              className="px-5 py-2.5 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/30 flex items-center gap-2 hover:bg-blue-600 hover:text-white transition"
            >
              <Globe size={18} /> Website
            </a>
          )}
        </div>
      </div>

      {/* ADDRESS */}
      {(vendor.address || vendor.city) && (
        <div className="flex items-center gap-3 text-muted-foreground bg-secondary/30 p-4 rounded-2xl border">
          <MapPin size={20} className="text-primary" />
          <span className="text-sm md:text-base">
            {vendor.address}
            {vendor.city && `, ${vendor.city}`}
          </span>
        </div>
      )}

      {/* DESCRIPTION */}
      {vendor.description && (
        <div className="bg-card rounded-3xl border shadow-md p-6 md:p-8">
          <p className="text-lg leading-relaxed text-foreground/90">
            {vendor.description}
          </p>
        </div>
      )}

      {/* GALLERY */}
      {vendor.gallery_images?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {vendor.gallery_images.map((img: string, i: number) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border shadow hover:scale-[1.02] transition"
              >
                <img src={img} className="h-44 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* METADATA */}
      <div className="border rounded-3xl shadow-md p-8 bg-secondary/30 backdrop-blur">
        <h2 className="text-2xl font-bold mb-6">Vendor Details</h2>

        {vendor.category_slug === "restaurants" && <RestaurantMeta meta={vendor.metadata} />}
        {vendor.category_slug === "hotels" && <HotelMeta meta={vendor.metadata} />}
        {vendor.category_slug === "jets" && <JetsMeta meta={vendor.metadata} />}
        {vendor.category_slug === "flights" && <FlightsMeta meta={vendor.metadata} />}
        {vendor.category_slug === "car_driver" && <CarDriverMeta meta={vendor.metadata} />}
        {vendor.category_slug === "car_renting" && <CarRentMeta meta={vendor.metadata} />}
      </div>
    </div>
  );
}
