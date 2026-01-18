"use client";
import { useEffect, useState } from "react";
import { LayoutGrid, List, Grid3X3, Plus } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import AddCategoryModal from "../components/AddCategoryModal";

const PLACEHOLDER = "https://via.placeholder.com/150?text=No+Icon";

const Categories = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ---------- NEW STATE FOR EDIT ----------
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const res = await fetch("/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("Fetched Categories:", data);

      if (res.ok) setCategories(data.categories || []);
      else console.log("Failed to load categories");
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ---------- EDIT HANDLER ----------
  const handleEdit = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    if (!cat) return;

    setEditingCategory(cat);
    setOpen(true); // open same modal but in edit mode
  };

  // ---------- DELETE HANDLER ----------
  const handleDelete = async (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    if (!cat) return;

    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(`/api/categories/${cat.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      console.log("Category deleted");
    } catch (error) {
      console.error("Delete error", error);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10 hidden md:flex">
            <Grid3X3 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
            <p className="mt-1 text-sm md:text-base text-gray-500">
              Browse service categories
            </p>
          </div>
        </div>

        {/* Add + View Toggle */}
        <div className="flex overflow-hidden rounded-xl border bg-surface p-1">
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
              bg-gradient-to-r from-primary to-primary-hover text-white font-semibold mr-2"
            onClick={() => {
              setEditingCategory(null); // ensure fresh form when adding
              setOpen(true);
            }}
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>

          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${viewMode === "grid"
                ? "bg-primary/10 text-primary"
                : "text-gray-500"
              }`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
            Grid
          </button>

          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${viewMode === "list"
                ? "bg-primary/10 text-primary"
                : "text-gray-500"
              }`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            List
          </button>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center text-gray-500 py-10">
          Loading categories...
        </p>
      )}

      {/* Categories Grid */}
      {!loading && (
        <div
          className={`grid gap-4 md:gap-6 ${viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
            }`}
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              icon={cat.icon_url || PLACEHOLDER}
              title={cat.name}
              slug={cat.slug}
              vendorCount={0}
              description=""
              gradient=""
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal (Add + Edit shared) */}
      <AddCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        editingData={editingCategory}
        onSubmit={async () => {
          await fetchCategories();
          setEditingCategory(null);
        }}
      />

    </div>
  );
};

export default Categories;
