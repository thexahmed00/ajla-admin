import { Search, SlidersHorizontal } from "lucide-react";

type Props = {
  onCategoryChange: (slug: string) => void;
};

export default function VendorsToolbar({ onCategoryChange }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onCategoryChange(e.target.value);
  }

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
          onChange={handleChange}
          className="w-full md:w-52 px-4 py-3 rounded-xl bg-surface border border-border text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-200 appearance-none cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="restaurants">Restaurants</option>
          <option value="hotels">Hotels</option>
          <option value="jets">Private Jets</option>
          <option value="car_renting">Car Renting</option>
          <option value="flights">Flights</option>
          <option value="car_driver">Car & Driver</option>
          <option value="spa">Spa & Wellness</option>
        </select>

        <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
      </div>
    </div>
  );
}
