import { LucideIcon, ChevronRight, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Boat from "../../../public/icons/Boat.png";
import CarDriver from "../../../public/icons/Car & Driver.png";
import Car from "../../../public/icons/Car.png";
import Flight from "../../../public/icons/Flight.png";
import Hotel from "../../../public/icons/Hotel.png";
import PrivateJet from "../../../public/icons/Private Jet.png";
import Restaurant from "../../../public/icons/Restaurant.png";


interface CategoryCardProps {
  id:number
  icon: string;
  title: string;
  slug: string;
  description: string;
  vendorCount: number;
  gradient: string;
  onEdit?: (slug: string) => void;
  onDelete?: (slug: string) => void;
}
const CATEGORY_ICONS: Record<string, any> = {
  restaurants: Restaurant,
  hotels: Hotel,
  jets: PrivateJet,
  flights: Flight,
  car_renting: Car,
  car_driver: CarDriver,
  boats: Boat,
};


const CategoryCard = ({
  id,
  icon,
  title,
  slug,
  description,
  vendorCount,
  gradient,
  onEdit,
  onDelete,
}: CategoryCardProps) => {
  const IconImage = CATEGORY_ICONS[slug];

  return (
    <Link href={``}>
      <div className="group relative flex flex-col items-center rounded-xl border border-border bg-surface p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div
          className="relative mb-5 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
          style={{ background: gradient }}
        >
          {/* <img src={icon} alt="Icon" className="h-full w-full md:h-10 md:w-10 text-white" /> */}
          {/* {IconImage && ( */}
            <img
              src={icon}
              alt={title}
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
            />
          {/* // )} */}

        </div>

        <h3 className="relative mb-2 text-lg md:text-xl font-semibold text-text-main group-hover:text-primary transition-colors">
          {title}
        </h3>

        <span className="relative mb-3 rounded-full bg-surface-hover px-3 py-1 text-xs text-text-muted border border-border">
          {slug}
        </span>

        <p className="relative mb-5 text-center text-sm text-text-muted line-clamp-2">
          {description}
        </p>

        <div className="relative mb-4 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* === EDIT + DELETE ICONS === */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0">

          {/* Edit */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit?.(slug);
            }}
            className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition"
          >
            <Pencil className="w-4 h-4 text-blue-500" />
          </button>

          {/* Delete */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete?.(slug);
            }}
            className="p-2 rounded-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>

        {/* View arrow */}
        {/* <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
          <div className="p-2 rounded-full bg-primary/10">
            <ChevronRight className="w-4 h-4 text-primary" />
          </div>
        </div> */}
      </div>
    </Link>
  );
};

export default CategoryCard;
