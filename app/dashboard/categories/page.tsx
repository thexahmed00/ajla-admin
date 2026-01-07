"use client";
import { useState } from "react";
import { 
  Plane, 
  Ship, 
  Building2, 
  UtensilsCrossed, 
  PartyPopper, 
  Sparkles,
  LayoutGrid,
  List,
  Grid3X3
} from "lucide-react";
import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    id: 1,
    icon: Plane,
    title: "Private Jets",
    slug: "private-jets",
    description: "Luxury private aviation services",
    vendorCount: 8,
    gradient: "linear-gradient(135deg, hsl(210 80% 60%) 0%, hsl(230 70% 50%) 100%)",
  },
  {
    id: 2,
    icon: Ship,
    title: "Yacht Charters",
    slug: "yacht",
    description: "Exclusive yacht rentals and cruises",
    vendorCount: 5,
    gradient: "linear-gradient(135deg, hsl(175 70% 50%) 0%, hsl(190 60% 45%) 100%)",
  },
  {
    id: 3,
    icon: Building2,
    title: "Hotels",
    slug: "hotels",
    description: "Premium hotels and resorts",
    vendorCount: 12,
    gradient: "linear-gradient(135deg, hsl(40 80% 55%) 0%, hsl(30 70% 45%) 100%)",
  },
  {
    id: 4,
    icon: UtensilsCrossed,
    title: "Restaurants",
    slug: "restaurants",
    description: "Fine dining experiences worldwide",
    vendorCount: 24,
    gradient: "linear-gradient(135deg, hsl(280 60% 65%) 0%, hsl(260 50% 55%) 100%)",
  },
  {
    id: 5,
    icon: PartyPopper,
    title: "Events",
    slug: "events",
    description: "Exclusive events and celebrations",
    vendorCount: 15,
    gradient: "linear-gradient(135deg, hsl(160 60% 50%) 0%, hsl(140 50% 45%) 100%)",
  },
  {
    id: 6,
    icon: Sparkles,
    title: "Experiences",
    slug: "experiences",
    description: "Unique curated experiences",
    vendorCount: 18,
    gradient: "linear-gradient(135deg, hsl(350 70% 60%) 0%, hsl(15 60% 55%) 100%)",
  },
];

const Categories = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10 hidden md:flex">
            <Grid3X3 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-main">
              Categories
            </h1>
            <p className="mt-1 text-text-muted text-sm md:text-base">
              Browse service categories
            </p>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex overflow-hidden rounded-xl border border-border bg-surface p-1">
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
              viewMode === "grid"
                ? "bg-primary/10 text-primary"
                : "text-text-muted hover:text-text-main hover:bg-surface-hover"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
              viewMode === "list"
                ? "bg-primary/10 text-primary"
                : "text-text-muted hover:text-text-main hover:bg-surface-hover"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div
        className={`grid gap-4 md:gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryCard
              icon={category.icon}
              title={category.title}
              slug={category.slug}
              description={category.description}
              vendorCount={category.vendorCount}
              gradient={category.gradient}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
