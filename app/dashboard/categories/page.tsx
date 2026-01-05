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
  List
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
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-foreground">
            Categories
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse service categories
          </p>
        </div>

        {/* View toggle */}
        <div className="flex overflow-hidden rounded-lg border border-border bg-secondary">
          <button
            className={`px-3 py-2 transition-colors ${
              viewMode === "grid"
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            className={`px-3 py-2 transition-colors ${
              viewMode === "list"
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            slug={category.slug}
            description={category.description}
            vendorCount={category.vendorCount}
            gradient={category.gradient}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
