"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Dish = {
  category: string;
  name: string;
};

const categories = [
  { id: 1, slug: "restaurants", name: "Restaurants" },
  { id: 2, slug: "hotels", name: "Hotels" },
  { id: 3, slug: "jets", name: "Private Jets" },
  { id: 4, slug: "car_renting", name: "Car Renting" },
  { id: 5, slug: "flights", name: "Flights" },
  { id: 6, slug: "car_driver", name: "Car & Driver" },
];

export default function AddVendorPage() {
  const [form, setForm] = useState({
    name: "",
    category_slug: "",
    description: "",
    fullDescription: "",
    address: "",
    phone: "",
    whatsapp: "",
    website: "",
    rating: "",
    status: "active",
    metadata: {
      cuisine: "",
      dishes: [{ category: "", name: "" }],
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleMetadataChange = (key: string, value: any) => {
    setForm({
      ...form,
      metadata: { ...form.metadata, [key]: value },
    });
  };

  const handleDishChange = (
    index: number,
    field: keyof Dish,
    value: string
  ) => {
    const dishes = [...form.metadata.dishes];
    dishes[index][field] = value;
    handleMetadataChange("dishes", dishes);
  };

  const addDish = () => {
    handleMetadataChange("dishes", [
      ...form.metadata.dishes,
      { category: "", name: "" },
    ]);
  };

  const submit = () => {
    const payload = {
      ...form,
      rating: Number(form.rating),
    };
    console.log("API Payload →", payload);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-light text-foreground mb-2">Basic Information</h2>
          <div className="h-px bg-border mb-6" />

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Category <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-black border border-border rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  name="category_slug"
                  value={form.category_slug}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Name <span className="text-primary">*</span>
              </label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                name="name"
                placeholder="Vendor name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Short Description
              </label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                name="description"
                placeholder="Brief summary for listings"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Full Description
              </label>
              <textarea
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-[120px] resize-none"
                name="fullDescription"
                placeholder="Detailed vendor description"
                value={form.fullDescription}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Rating
                </label>
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="0.0 – 5.0"
                  value={form.rating}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Status
                </label>
                <div className="flex items-center gap-3 bg-secondary border border-border rounded-lg px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={form.status === "active"}
                    onChange={(e) => setForm({ ...form, status: e.target.checked ? "active" : "inactive" })}
                    className="w-5 h-5 rounded border-border bg-secondary accent-primary"
                  />
                  <span className="text-foreground">Active</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Cuisine
              </label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="Italian, Mediterranean"
                value={form.metadata.cuisine}
                onChange={(e) => handleMetadataChange("cuisine", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Dishes
              </label>
              <div className="space-y-3">
                {form.metadata.dishes.map((dish, i) => (
                  <div key={i} className="grid grid-cols-2 gap-3">
                    <input
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      placeholder="Category"
                      value={dish.category}
                      onChange={(e) => handleDishChange(i, "category", e.target.value)}
                    />
                    <input
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      placeholder="Name"
                      value={dish.name}
                      onChange={(e) => handleDishChange(i, "name", e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={addDish}
                type="button"
                className="mt-3 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                + Add Dish
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-light text-foreground mb-2">Contact Information</h2>
          <div className="h-px bg-border mb-6" />

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Address
              </label>
              <textarea
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-[120px] resize-none"
                name="address"
                placeholder="Full address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Phone
                </label>
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  name="phone"
                  placeholder="+966 12 345 6789"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  WhatsApp
                </label>
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  name="whatsapp"
                  placeholder="+966 12 345 6789"
                  value={form.whatsapp}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Website
              </label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                name="website"
                placeholder="https://example.com"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <button
              onClick={submit}
              type="button"
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-medium hover:bg-primary/90 transition-colors mt-4"
            >
              Save Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
