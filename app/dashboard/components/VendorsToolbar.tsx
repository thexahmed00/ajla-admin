import { Search, SlidersHorizontal } from "lucide-react";

export default function VendorsToolbar() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
        <input
          type="text"
          placeholder="Search vendors..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border text-text-main placeholder:text-text-dim outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-200"
        />
      </div>

      {/* Category filter */}
      <div className="relative">
        <select
          className="w-full md:w-52 px-4 py-3 rounded-xl bg-surface border border-border text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-200 appearance-none cursor-pointer"
        >
          <option>All Categories</option>
          <option>Hotels</option>
          <option>Private Jets</option>
          <option>Restaurants</option>
          <option>Yacht Charters</option>
          <option>Spa & Wellness</option>
        </select>
        <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
      </div>
    </div>
  );
}
