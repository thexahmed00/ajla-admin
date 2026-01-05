"use client";

import { useState } from "react";

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
    address: "",
    phone: "",
    whatsapp: "",
    website: "",
    rating: "",
    metadata: {
      cuisine: "",
      dishes: [{ category: "", name: "" }],
    },
  });

  const handleChange = (e: any) => {
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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Basic Information */}
      <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl p-6">
        <h2 className="text-lg mb-4">Basic Information</h2>

        <label className="block mb-3">
          Category *
          <select
            className="input"
            name="category_slug"
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-3">
          Name *
          <input
            className="input"
            name="name"
            placeholder="Vendor name"
            onChange={handleChange}
          />
        </label>

        <label className="block mb-3">
          Short Description
          <input
            className="input"
            name="description"
            placeholder="Brief summary for listings"
            onChange={handleChange}
          />
        </label>

        <label className="block mb-3">
          Full Description
          <textarea
            className="input h-28"
            placeholder="Detailed vendor description"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label>
            Rating
            <input
              className="input"
              name="rating"
              type="number"
              step="0.1"
              onChange={handleChange}
            />
          </label>

          <label>
            Cuisine
            <input
              className="input"
              placeholder="Italian, Mediterranean"
              onChange={(e) => handleMetadataChange("cuisine", e.target.value)}
            />
          </label>
        </div>

        <div className="mt-4">
          <h3 className="mb-2">Dishes</h3>
          {form.metadata.dishes.map((dish, i) => (
            <div key={i} className="grid grid-cols-2 gap-3 mb-2">
              <input
                className="input"
                placeholder="Category"
                value={dish.category}
                onChange={(e) =>
                  handleDishChange(i, "category", e.target.value)
                }
              />
              <input
                className="input"
                placeholder="Name"
                value={dish.name}
                onChange={(e) => handleDishChange(i, "name", e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={addDish}
            className="text-sm text-[#FF7F41]"
          >
            + Add Dish
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl p-6">
        <h2 className="text-lg mb-4">Contact Information</h2>

        <label className="block mb-3">
          Address
          <textarea
            className="input h-24"
            name="address"
            onChange={handleChange}
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label>
            Phone
            <input className="input" name="phone" onChange={handleChange} />
          </label>
          <label>
            WhatsApp
            <input
              className="input"
              name="whatsapp"
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="block mt-4">
          Website
          <input className="input" name="website" onChange={handleChange} />
        </label>

        <button
          onClick={submit}
          className="mt-6 w-full bg-[#FF7F41] text-black py-3 rounded-lg"
        >
          Save Vendor
        </button>
      </div>
    </div>
  );
}


