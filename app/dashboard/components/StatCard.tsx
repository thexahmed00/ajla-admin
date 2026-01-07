import { LucideIcon, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  trend?: string;
}

export default function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="relative bg-surface border border-border rounded-xl p-5 md:p-6 
      hover:border-primary/30 transition-all duration-300 
      hover:shadow-lg hover:shadow-primary/5 
      hover:-translate-y-1
      group overflow-hidden">
      
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-text-muted text-xs md:text-sm font-medium uppercase tracking-wide group-hover:text-text-main transition-colors duration-200">
            {title}
          </h3>
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-200">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <p className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
          {value}
        </p>
        
        {trend && (
          <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>

      {/* Decorative corner */}
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
