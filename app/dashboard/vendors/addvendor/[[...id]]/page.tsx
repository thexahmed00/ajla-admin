"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { metaDefaults } from "../metaSchema";
import { useParams } from "next/navigation";

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
  const { id } = useParams();
  const vendorId = Array.isArray(id) ? id[0] : id;

  console.log("Vendor ID:", vendorId);
  const isEdit = Boolean(id);
  type Metadata = {
    [key: string]: any;
  };

  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Details" },
    { id: 3, title: "Contact" },
  ];

  const [form, setForm] = useState<{
    name: string;
    category_slug: string;
    description: string;
    fullDescription: string;
    address: string;
    city: string;
    phone: string;
    whatsapp: string;
    website: string;
    rating: string;
    status: string;
    metadata: Metadata;
  }>({
    name: "",
    category_slug: "",
    description: "",
    fullDescription: "",
    address: "",
    city: "",
    phone: "",
    whatsapp: "",
    website: "",
    rating: "",
    status: "active",
    metadata: {}
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  // 
  const handleCategoryChange = (slug: string) => {
    setForm(prev => ({
      ...prev,
      category_slug: slug,
      metadata: metaDefaults[slug] || {}
    }));
  };






  const submit = async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("token", token)
      if (!token) {
        alert("Authentication expired, please login again.");
        return;
      }

      const payload = {
        ...form,
        // rating: Number(form.rating),
        token
      };

      console.log("Sending →", payload);
      if (isEdit) {
        const updatePayload = {
          id: vendorId,
          ...form,
          // rating: Number(form.rating),
          token
        };
        const res = await fetch("/api/updatevendor", {
          method: "PUT",
          body: JSON.stringify(updatePayload)
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data?.message || "Failed to update vendor");
          return;
        }

        alert("Vendor updated successfully!");
        console.log("Vendor Response:", data);
      }

      else {
        console.log("else block")
        const res = await fetch("/api/vendors", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log("Data received", data)

        if (!res.ok) {
          alert(data?.message || "Failed to create vendor");
          return;
        }

        alert("Vendor created successfully!");
        console.log("Vendor Response:", data);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };




  const handleMetadataChange = (key: string, value: any) => {
    setForm(prev => ({
      ...prev,
      metadata: { ...prev.metadata, [key]: value },
    }));
  };

  const handleNestedMetadata = (parent: string, key: string, value: any) => {
    setForm(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [parent]: {
          ...(prev.metadata[parent] || {}),
          [key]: value
        }
      }
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-secondary -z-10 rounded-full" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isCompleted ? "bg-primary border-primary text-white" : ""}
                  ${isCurrent ? "border-primary text-primary bg-background" : ""}
                  ${!isCompleted && !isCurrent ? "border-muted-foreground/30 text-muted-foreground bg-secondary" : ""}
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <span className={`text-xs font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );


  // handling update form if id is present
  const deepMerge = (target: any, source: any) => {
    if (!source) return target;

    const output = { ...target };

    Object.keys(source).forEach(key => {
      if (
        typeof source[key] === "object" &&
        !Array.isArray(source[key]) &&
        source[key] !== null
      ) {
        output[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    });

    return output;
  };

  const mergeMetadata = (slug: string, existingMeta: any) => {
    const def = metaDefaults[slug] || {};

    return deepMerge(def, existingMeta || {});
  };


  useEffect(() => {
    if (!isEdit) return;

    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const vendorId = Array.isArray(id) ? id[0] : id;

        const res = await fetch(`/api/vendordetails?id=${vendorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Vendor Details:", data);

        setForm({
          name: data.name,
          category_slug: data.category_slug,
          description: data.description,
          fullDescription: data.description,
          address: data.address,
          city: data.city,
          phone: data.phone,
          whatsapp: data.whatsapp,
          website: data.website,
          rating: String(data.rating),
          status: data.is_active ? "active" : "inactive",
          metadata: data.metadata || {}
        });

      } catch (error) {
        console.error("Failed to load vendor", error);
      }
    };

    fetchVendor();
  }, [id]);

  const SAUDI_CITIES = [
    "Riyadh",
    "Jeddah",
    "Mecca",
    "Medina",
    "Dammam",
    "Khobar",
    "Dhahran",
    "Taif",
    "Tabuk",
    "Abha",
    "Jazan",
    "Hail",
    "Buraidah",
    "Hofuf",
    "Najran",
  ];

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredCities = SAUDI_CITIES.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (city: string) => {
    setForm({ ...form, city });
    setOpen(false);
    setSearch("");
  };




  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-light mb-8">Add New Vendor</h1>

      {renderStepIndicator()}

      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-medium mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Category <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    name="category_slug"
                    value={form.category_slug}
                    onChange={(e) => {
                      // const slug = e.target.value;
                      // setForm(prev => ({
                      //   ...prev,
                      //   category_slug: slug,
                      //   metadata: metaDefaults[slug] || {}
                      // }));
                      handleCategoryChange(e.target.value)
                    }}
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Vendor Name <span className="text-red-500">*</span></label>
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-muted-foreground/40"
                  name="name"
                  placeholder="e.g. The Ritz-Carlton"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Initial Status</label>
                <div className="flex items-center gap-3 bg-secondary border border-border rounded-lg px-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={form.status === "active"}
                    onChange={(e) => setForm({ ...form, status: e.target.checked ? "active" : "inactive" })}
                    className="w-5 h-5 rounded border-gray-400 bg-transparent accent-primary cursor-pointer"
                  />
                  <span className={form.status === "active" ? "text-green-500 font-medium" : "text-muted-foreground"}>
                    {form.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Rating</label>
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
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

            </div>
          </div>
        )}

        {/* Step 2: Details & Metadata */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-medium mb-4">Details & specific data</h2>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Short Description</label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                name="description"
                placeholder="Brief summary for list view"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Description</label>
              <textarea
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none min-h-[120px] resize-none"
                name="fullDescription"
                placeholder="Detailed information about the vendor..."
                value={form.fullDescription}
                onChange={handleChange}
              />
            </div>

            {/* Category Specific Fields */}
            {/* Restaurants Form */}
            {form.category_slug === "restaurants" && (
  <div className="mt-8 border-t border-border pt-6 space-y-6">
    <h3 className="text-lg font-medium text-primary">Restaurant Specifics</h3>

    {/* CUISINE */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Cuisine Type</label>
      <input
        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
        value={form.metadata.cuisine || ""}
        onChange={(e) => handleMetadataChange("cuisine", e.target.value)}
        placeholder="e.g. Italian, Mediterranean"
      />
    </div>

    {/* HOURS ARRAY */}
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">Opening Hours</label>

        <button
          type="button"
          onClick={() =>
            handleMetadataChange("hours", [
              ...(form.metadata.hours || []),
              { name: "", time: "" }
            ])
          }
          className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full"
        >
          + Add Hours Slot
        </button>
      </div>

      {(form.metadata.hours || []).map((hour: any, i: number) => (
        <div key={i} className="grid grid-cols-2 gap-3 items-center">
          <input
            className="bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm"
            placeholder="Day Range (e.g. Mon-Thu)"
            value={hour?.name || ""}
            onChange={(e) => {
              const updated = [...(form.metadata.hours || [])];
              updated[i].name = e.target.value;
              handleMetadataChange("hours", updated);
            }}
          />

          <input
            className="bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm"
            placeholder="Time (e.g. 12 PM - 11 PM)"
            value={hour?.time || ""}
            onChange={(e) => {
              const updated = [...(form.metadata.hours || [])];
              updated[i].time = e.target.value;
              handleMetadataChange("hours", updated);
            }}
          />

          <button
            type="button"
            onClick={() => {
              const updated = [...(form.metadata.hours || [])];
              updated.splice(i, 1);
              handleMetadataChange("hours", updated);
            }}
            className="text-red-500 text-sm col-span-2 text-left"
          >
            Remove
          </button>
        </div>
      ))}
    </div>

    {/* COURSES + DISHES */}
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-muted-foreground">Courses</label>

        <button
          type="button"
          onClick={() =>
            handleMetadataChange("courses", [
              ...(form.metadata.courses || []),
              { name: "", dishes: [] }
            ])
          }
          className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full"
        >
          + Add Course
        </button>
      </div>

      {(form.metadata.courses || []).map((course: any, i: number) => (
        <div key={i} className="border border-border rounded-lg p-4 space-y-3">
          {/* COURSE NAME */}
          <input
            className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm"
            placeholder="Course Name (e.g. Appetizers)"
            value={course?.name || ""}
            onChange={(e) => {
              const updated = [...(form.metadata.courses || [])];
              updated[i].name = e.target.value;
              handleMetadataChange("courses", updated);
            }}
          />

          {/* ADD DISH BUTTON */}
          <button
            type="button"
            onClick={() => {
              const updated = [...(form.metadata.courses || [])];
              updated[i].dishes = [...(updated[i].dishes || []), { name: "", image: "", price: "" }];
              handleMetadataChange("courses", updated);
            }}
            className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full"
          >
            + Add Dish
          </button>

          {/* DISHES */}
          {(course?.dishes || []).map((dish: any, j: number) => (
            <div key={j} className="grid grid-cols-3 gap-3">
              <input
                className="bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm"
                placeholder="Dish Name"
                value={dish?.name || ""}
                onChange={(e) => {
                  const updated = [...(form.metadata.courses || [])];
                  updated[i].dishes[j].name = e.target.value;
                  handleMetadataChange("courses", updated);
                }}
              />

              <input
                className="bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm"
                placeholder="Image URL"
                value={dish?.image || ""}
                onChange={(e) => {
                  const updated = [...(form.metadata.courses || [])];
                  updated[i].dishes[j].image = e.target.value;
                  handleMetadataChange("courses", updated);
                }}
              />

              <input
                className="bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm"
                placeholder="Price (e.g 120 SAR)"
                value={dish?.price || ""}
                onChange={(e) => {
                  const updated = [...(form.metadata.courses || [])];
                  updated[i].dishes[j].price = e.target.value;
                  handleMetadataChange("courses", updated);
                }}
              />

              <button
                type="button"
                onClick={() => {
                  const updated = [...(form.metadata.courses || [])];
                  updated[i].dishes.splice(j, 1);
                  handleMetadataChange("courses", updated);
                }}
                className="text-red-500 text-sm col-span-3 text-left"
              >
                Remove Dish
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              const updated = [...(form.metadata.courses || [])];
              updated.splice(i, 1);
              handleMetadataChange("courses", updated);
            }}
            className="text-red-500 text-sm"
          >
            Remove Course
          </button>
        </div>
      ))}
    </div>
  </div>
)}




            {/* Car Rental Form */}
            {form.category_slug === "car_renting" && (
              <div className="bg-card border border-border rounded-xl p-8 mt-6">
                <h2 className="text-xl mb-3">Car Rental Details</h2>

                {/* Vehicle Type */}
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"

                  placeholder="Vehicle Type"
                  value={form.metadata.vehicle_type}
                  onChange={e => handleMetadataChange("vehicle_type", e.target.value)}
                />

                {/* Daily Rate */}
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"

                  type="number"
                  placeholder="Daily Rate"
                  value={form.metadata.daily_rate}
                  onChange={e => handleMetadataChange("daily_rate", Number(e.target.value))}
                />

                {/* Currency */}
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"

                  placeholder="Currency"
                  value={form.metadata.currency}
                  onChange={e => handleMetadataChange("currency", e.target.value)}
                />

                <h3 className="text-lg mt-4 mb-2">Specifications</h3>

                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                    placeholder="Doors"
                    value={form.metadata.specifications.doors}
                    onChange={e => handleNestedMetadata("specifications", "doors", e.target.value)}
                  />

                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                    placeholder="Seats"
                    value={form.metadata.specifications.seats}
                    onChange={e => handleNestedMetadata("specifications", "seats", e.target.value)}
                  />

                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                    placeholder="Fuel Type"
                    value={form.metadata.specifications.fuel_type}
                    onChange={e => handleNestedMetadata("specifications", "fuel_type", e.target.value)}
                  />

                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                    placeholder="Transmission"
                    value={form.metadata.specifications.transmission}
                    onChange={e => handleNestedMetadata("specifications", "transmission", e.target.value)}
                  />

                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                    placeholder="Engine"
                    value={form.metadata.specifications.engine}
                    onChange={e => handleNestedMetadata("specifications", "engine", e.target.value)}
                  />

                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                    placeholder="Horsepower"
                    value={form.metadata.specifications.horsepower}
                    onChange={e => handleNestedMetadata("specifications", "horsepower", e.target.value)}
                  />
                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                    placeholder="Acceleration"
                    value={form.metadata.specifications.acceleration}
                    onChange={e => handleNestedMetadata("specifications", "acceleration", e.target.value)}
                  />
                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                    placeholder="Top Speed"
                    value={form.metadata.specifications.top_speed}
                    onChange={e => handleNestedMetadata("specifications", "top_speed", e.target.value)}
                  />
                </div>

                {/* FEATURES ARRAY */}
                <h3 className="mt-4 mb-2">Features</h3>
                {form.metadata.features.map((f: string, i: number) => (
                  <input
                    key={i}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"

                    placeholder="Feature"
                    value={f}
                    onChange={(e) => {
                      const updated = [...form.metadata.features];
                      updated[i] = e.target.value;
                      handleMetadataChange("features", updated);
                    }}
                  />
                ))}
                <button
                  type="button"
                  className="text-sm text-primary"
                  onClick={() => handleMetadataChange("features", [...form.metadata.features, ""])}
                >
                  + Add Feature
                </button>
                <h3 className="mt-4 mb-2">Services Included</h3>
                {form.metadata.services_included.map((f: string, i: number) => (
                  <input
                    key={i}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"

                    placeholder="Service"
                    value={f}
                    onChange={(e) => {
                      const updated = [...form.metadata.services_included];
                      updated[i] = e.target.value;
                      handleMetadataChange("services_included", updated);
                    }}
                  />
                ))}
                <button
                  type="button"
                  className="text-sm text-primary"
                  onClick={() => handleMetadataChange("services_included", [...form.metadata.services_included, ""])}
                >
                  + Add Service
                </button>

                {/* POLICIES */}
                <h3 className="mt-4 mb-2">Policies</h3>

                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"

                  placeholder="Minimum Age"
                  value={form.metadata.policies.minimum_age}
                  onChange={e => handleNestedMetadata("policies", "minimum_age", e.target.value)}
                />

                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"

                  placeholder="Deposit Amount"
                  value={form.metadata.policies.deposit_amount}
                  onChange={e => handleNestedMetadata("policies", "deposit_amount", e.target.value)}
                />

                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"

                  placeholder="Cancellation Policy"
                  value={form.metadata.policies.cancellation}
                  onChange={e => handleNestedMetadata("policies", "cancellation", e.target.value)}
                />
              </div>
            )}
            {/* Hotels Form */}
            {form.category_slug === "hotels" && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Hotel Details</h3>
                <div>
                  <label className="block text-sm mb-1">Star Rating</label>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3"
                    value={form.metadata.star_rating || ""}
                    onChange={(e) =>
                      handleMetadataChange("star_rating", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Check-In</label>
                  <input
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3"
                    value={form.metadata.check_in || ""}
                    placeholder="3:00 PM"
                    onChange={(e) => handleMetadataChange("check_in", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Check-Out</label>
                  <input
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3"
                    value={form.metadata.check_out || ""}
                    placeholder="12:00 PM"
                    onChange={(e) => handleMetadataChange("check_out", e.target.value)}
                  />
                </div>
                {/* AMENITIES */}
                <div className="mb-6">
                  <label className="block text-sm mb-2">Amenities</label>

                  {form.metadata.amenities?.map((a: any, i: any) => (
                    <div key={i} className="grid grid-cols-3 gap-3 mb-3">

                      <input
                        placeholder="Amenity Name"
                        value={a.name || ""}
                        className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => {
                          const updated = [...form.metadata.amenities];
                          updated[i].name = e.target.value;
                          handleMetadataChange("amenities", updated);
                        }}
                      />

                      <input
                        placeholder="Icon (wifi / pool / spa)"
                        value={a.icon || ""}
                        className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => {
                          const updated = [...form.metadata.amenities];
                          updated[i].icon = e.target.value;
                          handleMetadataChange("amenities", updated);
                        }}
                      />

                      <input
                        placeholder="Subtitle"
                        value={a.subtitle || ""}
                        className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => {
                          const updated = [...form.metadata.amenities];
                          updated[i].subtitle = e.target.value;
                          handleMetadataChange("amenities", updated);
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          handleMetadataChange(
                            "amenities",
                            form.metadata.amenities.filter((_: any, idx: any) => idx !== i)
                          )
                        }
                        className="text-red-500 text-sm col-span-3 text-left"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      handleMetadataChange("amenities", [
                        ...(form.metadata.amenities || []),
                        { name: "", icon: "", subtitle: "" },
                      ])
                    }
                    className="text-primary text-sm"
                  >
                    + Add Amenity
                  </button>

                </div>
                {/* NEARBY ATTRACTIONS */}
                <div>
                  <h3 className="mt-6 mb-2 font-medium">Nearby Attractions</h3>

                  {form.metadata.nearby_attractions?.map((a: any, i: any) => (
                    <div key={i} className="grid grid-cols-4 gap-3 mb-3">

                      <input placeholder="Name" value={a.name || ""}
                        className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => {
                          const u = [...form.metadata.nearby_attractions];
                          u[i].name = e.target.value;
                          handleMetadataChange("nearby_attractions", u);
                        }}
                      />

                      <input placeholder="Distance (2.5 km)" value={a.distance || ""}
                        className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => {
                          const u = [...form.metadata.nearby_attractions];
                          u[i].distance = e.target.value;
                          handleMetadataChange("nearby_attractions", u);
                        }}
                      />

                      <input placeholder="Icon" value={a.icon || ""}
                        className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => {
                          const u = [...form.metadata.nearby_attractions];
                          u[i].icon = e.target.value;
                          handleMetadataChange("nearby_attractions", u);
                        }}
                      />

                      <input placeholder="Category" value={a.category || ""}
                        className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => {
                          const u = [...form.metadata.nearby_attractions];
                          u[i].category = e.target.value;
                          handleMetadataChange("nearby_attractions", u);
                        }}
                      />

                      <button className="text-red-500 text-sm col-span-4 text-left"
                        onClick={() =>
                          handleMetadataChange(
                            "nearby_attractions",
                            form.metadata.nearby_attractions.filter((_: any, idx: any) => idx !== i)
                          )
                        }>
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="text-primary text-sm"
                    onClick={() =>
                      handleMetadataChange("nearby_attractions", [
                        ...(form.metadata.nearby_attractions || []),
                        { name: "", distance: "", icon: "", category: "" },
                      ])
                    }
                  >
                    + Add Nearby Attraction
                  </button>

                </div>
                {/* ROOMS */}
                <div>
                  <h3 className="mt-6 mb-2 font-medium">Room Types</h3>

                  {form.metadata.room_types?.map((room: any, i: any) => (
                    <div key={i} className="grid grid-cols-2 gap-3 mb-4">

                      <input placeholder="Room Name" value={room.name || ""} className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => { const u = [...form.metadata.room_types]; u[i].name = e.target.value; handleMetadataChange("room_types", u) }}
                      />

                      <input placeholder="Price" value={room.price || ""} className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => { const u = [...form.metadata.room_types]; u[i].price = e.target.value; handleMetadataChange("room_types", u) }}
                      />

                      <input placeholder="Image URL" value={room.image || ""} className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => { const u = [...form.metadata.room_types]; u[i].image = e.target.value; handleMetadataChange("room_types", u) }}
                      />

                      <textarea placeholder="Description" value={room.description || ""} className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => { const u = [...form.metadata.room_types]; u[i].description = e.target.value; handleMetadataChange("room_types", u) }}
                      />

                      <input placeholder="Capacity" value={room.capacity || ""} className="bg-secondary border border-border rounded-lg px-3 py-2"
                        onChange={(e) => { const u = [...form.metadata.room_types]; u[i].capacity = e.target.value; handleMetadataChange("room_types", u) }}
                      />

                      <button
                        className="text-red-500 text-sm col-span-2 text-left"
                        onClick={() =>
                          handleMetadataChange(
                            "room_types",
                            form.metadata.room_types.filter((_: any, idx: any) => idx !== i)
                          )
                        }>
                        Remove Room
                      </button>
                    </div>
                  ))}

                  <button
                    className="text-primary text-sm"
                    onClick={() =>
                      handleMetadataChange("room_types", [
                        ...(form.metadata.room_types || []),
                        { name: "", price: "", image: "", description: "", capacity: "" },
                      ])
                    }
                  >
                    + Add Room Type
                  </button>

                </div>
              </div>
            )}
          </div>
        )}
        {form.category_slug === "jets" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Private Jets Details</h3>

            <label className="block text-sm mb-2">Aircrafts</label>

            {form.metadata.aircraft?.map((item: string, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground
        placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  placeholder="Aircraft Name (e.g. Gulfstream G650)"
                  value={item || ""}
                  onChange={(e) => {
                    const updated = [...form.metadata.aircraft];
                    updated[i] = e.target.value;
                    handleMetadataChange("aircraft", updated);
                  }}
                />

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => {
                    const updated = form.metadata.aircraft.filter(
                      (_: string, index: number) => index !== i
                    );
                    handleMetadataChange("aircraft", updated);
                  }}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                handleMetadataChange("aircraft", [
                  ...form.metadata.aircraft,
                  "",
                ])
              }
              className="text-sm text-primary"
            >
              + Add Aircraft
            </button>
          </div>
        )}
        {form.category_slug === "flights" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Flights Details</h3>

            {/* Open Hours */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Open Hours</label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3"
                placeholder="Example: 24/7 Concierge Support"
                value={form.metadata.open_hours || ""}
                onChange={(e) =>
                  handleMetadataChange("open_hours", e.target.value)
                }
              />
            </div>

            {/* Service Area */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Service Area</label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3"
                placeholder="Example: Domestic & International routes"
                value={form.metadata.service_area || ""}
                onChange={(e) =>
                  handleMetadataChange("service_area", e.target.value)
                }
              />
            </div>

            {/* Languages */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Languages</label>

              {form.metadata.languages?.map((lang: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3"
                    placeholder="Language"
                    value={lang || ""}
                    onChange={(e) => {
                      const updated = [...form.metadata.languages];
                      updated[i] = e.target.value;
                      handleMetadataChange("languages", updated);
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const updated = form.metadata.languages.filter(
                        (_: string, index: number) => index !== i
                      );
                      handleMetadataChange("languages", updated);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  handleMetadataChange("languages", [
                    ...form.metadata.languages,
                    ""
                  ])
                }
                className="text-primary text-sm"
              >
                + Add Language
              </button>
            </div>

            {/* Seat Types */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Seat Types</label>

              {form.metadata.seat_types?.map((seat: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3"
                    placeholder="Seat Type (Economy, Business, First Class)"
                    value={seat || ""}
                    onChange={(e) => {
                      const updated = [...form.metadata.seat_types];
                      updated[i] = e.target.value;
                      handleMetadataChange("seat_types", updated);
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const updated = form.metadata.seat_types.filter(
                        (_: string, index: number) => index !== i
                      );
                      handleMetadataChange("seat_types", updated);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  handleMetadataChange("seat_types", [
                    ...form.metadata.seat_types,
                    ""
                  ])
                }
                className="text-primary text-sm"
              >
                + Add Seat Type
              </button>
            </div>

            {/* Popular Routes */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Popular Routes</label>

              {form.metadata.popular_routes?.map((route: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3"
                    placeholder="Example: Dubai → Paris"
                    value={route || ""}
                    onChange={(e) => {
                      const updated = [...form.metadata.popular_routes];
                      updated[i] = e.target.value;
                      handleMetadataChange("popular_routes", updated);
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const updated = form.metadata.popular_routes.filter(
                        (_: string, index: number) => index !== i
                      );
                      handleMetadataChange("popular_routes", updated);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  handleMetadataChange("popular_routes", [
                    ...form.metadata.popular_routes,
                    ""
                  ])
                }
                className="text-primary text-sm"
              >
                + Add Route
              </button>
            </div>
          </div>
        )}
        {form.category_slug === "car_driver" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Car & Driver Details</h3>

            {/* ---------- Car Basic ---------- */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Car Basic</label>

              {/* Doors */}
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 mb-2"
                placeholder="Number of Doors"
                value={form.metadata.car_basic?.doors || ""}
                onChange={(e) =>
                  handleNestedMetadata("car_basic", "doors", e.target.value)
                }
              />

              {/* Seats */}
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 mb-2"
                placeholder="Number of Seats"
                value={form.metadata.car_basic?.seats || ""}
                onChange={(e) =>
                  handleNestedMetadata("car_basic", "seats", e.target.value)
                }
              />

              {/* Fuel */}
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 mb-2"
                placeholder="Fuel Type (Petrol / Diesel / Hybrid)"
                value={form.metadata.car_basic?.fuel || ""}
                onChange={(e) =>
                  handleNestedMetadata("car_basic", "fuel", e.target.value)
                }
              />
            </div>

            {/* ---------- Chauffeur ---------- */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Chauffeur</label>

              {/* Name */}
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 mb-2"
                placeholder="Chauffeur Name"
                value={form.metadata.chauffeur?.name || ""}
                onChange={(e) =>
                  handleNestedMetadata("chauffeur", "name", e.target.value)
                }
              />

              {/* Contact */}
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3"
                placeholder="Contact / Message Handle"
                value={form.metadata.chauffeur?.contact || ""}
                onChange={(e) =>
                  handleNestedMetadata("chauffeur", "contact", e.target.value)
                }
              />
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-medium mb-4">Contact Information</h2>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Address</label>
              <textarea
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                name="address"
                placeholder="Street address, City, ZIP code"
                rows={3}
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-full space-y-2 relative">
              <label className="text-sm font-medium text-muted-foreground">
                City Name
              </label>

              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="Select or search city..."
                value={search || form.city}
                onFocus={() => setOpen(true)}
                onClick={() => setOpen(true)}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpen(true);
                }}
              />

              {open && (
                <div className="absolute left-0 right-0 mt-1 bg-black border border-border rounded-lg max-h-60 overflow-auto shadow-md z-30">
                  {filteredCities.length === 0 ? (
                    <p className="p-3 text-sm text-muted-foreground">No city found</p>
                  ) : (
                    filteredCities.map((city) => (
                      <div
                        key={city}
                        onClick={() => handleSelect(city)}
                        className="px-4 py-2 cursor-pointer hover:bg-primary/10"
                      >
                        {city}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  name="phone"
                  placeholder="+966 50 000 0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">WhatsApp Number</label>
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  name="whatsapp"
                  placeholder="+966 50 000 0000"
                  value={form.whatsapp}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-full space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Website</label>
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  name="website"
                  placeholder="https://www.example.com"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors
                ${currentStep === 1 ? "opacity-0 pointer-events-none" : "hover:bg-secondary text-foreground"}
            `}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-lg shadow-primary/20"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              className="bg-[#FF7F41] hover:bg-[#FF7F41]/90 text-white px-8 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-lg shadow-[#FF7F41]/20"
            >
              <Check className="w-4 h-4" />
              {isEdit ? "Update Vendor" : "Save Vendor"}
            </button>
          )}
        </div>

      </div>
    </div >
  );
}
