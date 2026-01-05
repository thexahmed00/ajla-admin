import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  slug: string;
  description: string;
  vendorCount: number;
  gradient: string;
}

const CategoryCard = ({
  icon: Icon,
  title,
  slug,
  description,
  vendorCount,
  gradient,
}: CategoryCardProps) => {
  return (
    <div className="group relative flex flex-col items-center rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      {/* Icon with gradient background */}
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
        style={{ background: gradient }}
      >
        <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-semibold text-foreground">{title}</h3>

      {/* Slug badge */}
      <span className="mb-4 rounded-full bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
        {slug}
      </span>

      {/* Description */}
      <p className="mb-6 text-center text-sm text-muted-foreground">
        {description}
      </p>

      {/* Divider */}
      <div className="mb-6 h-px w-full bg-border" />

      {/* Vendor count */}
      <div className="text-center">
        <span className="block text-4xl font-light text-primary">
          {vendorCount}
        </span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Vendors
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
