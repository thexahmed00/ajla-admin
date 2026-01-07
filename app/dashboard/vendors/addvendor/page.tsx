"use client";
import { useState } from "react";
import { ChevronDown, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { metaDefaults } from "./metaSchema";

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






  const submit = async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("token",token)
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

      const res = await fetch("/api/vendors", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Failed to create vendor");
        return;
      }

      alert("Vendor created successfully!");
      console.log("Vendor Response:", data);

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
                      const slug = e.target.value;
                      setForm(prev => ({
                        ...prev,
                        category_slug: slug,
                        metadata: metaDefaults[slug] || {}
                      }));
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
            {form.category_slug === "restaurants" && (
                <div className="mt-8 border-t border-border pt-6 space-y-6">
                    <h3 className="text-lg font-medium text-primary">Restaurant Specifics</h3>
                    
                    <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Cuisine Type</label>
                    <input
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                        value={form.metadata.cuisine || ''}
                        onChange={(e) => handleMetadataChange("cuisine", e.target.value)}
                        placeholder="e.g. Italian, Japanese"
                    />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Opening Days</label>
                            <input
                            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                            placeholder="e.g. Mon-Sun"
                            value={(Object.keys(form.metadata.hours || {})[0] as string) || "mon-sun"}
                             onChange={(e) => {
                                const oldKey = Object.keys(form.metadata.hours || {})[0] || "mon-sun";
                                const timing = Object.values(form.metadata.hours || {})[0] || "";

                                handleMetadataChange("hours", {
                                [e.target.value]: timing
                                });
                            }}
                            />
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Opening Hours</label>
                            <input
                            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-all outline-none"
                            placeholder="e.g. 10 AM - 11 PM"
                            value={(Object.values(form.metadata.hours || {})[0] as string) || ""}
                            onChange={(e) => {
                                const key = Object.keys(form.metadata.hours || {})[0] || "mon-sun";

                                handleMetadataChange("hours", {
                                [key]: e.target.value
                                });
                            }}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                         <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-muted-foreground">Featured Dishes</label>
                            <button
                                type="button"
                                onClick={() =>
                                handleMetadataChange("dishes", [
                                    ...(form.metadata.dishes || []),
                                    { category: "", name: "" },
                                ])
                                }
                                className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                            >
                                + Add Dish
                            </button>
                         </div>
                         
                         {(form.metadata.dishes || []).map((dish: any, i: number) => (
                            <div key={i} className="flex gap-3">
                            <input
                                className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none"
                                placeholder="Category (e.g. Starters)"
                                value={dish?.category || ""}
                                onChange={(e) => {
                                const updated = [...(form.metadata.dishes || [])];
                                if (!updated[i]) updated[i] = {};
                                updated[i].category = e.target.value;
                                handleMetadataChange("dishes", updated);
                                }}
                            />
                            <input
                                className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none"
                                placeholder="Dish Name"
                                value={dish?.name || ""}
                                onChange={(e) => {
                                const updated = [...(form.metadata.dishes || [])];
                                if (!updated[i]) updated[i] = {};
                                updated[i].name = e.target.value;
                                handleMetadataChange("dishes", updated);
                                }}
                            />
                             <button 
                                type="button"
                                onClick={() => {
                                     const updated = [...(form.metadata.dishes || [])];
                                     updated.splice(i, 1);
                                     handleMetadataChange("dishes", updated);
                                }}
                                className="text-muted-foreground hover:text-red-500"
                             >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                             </button>
                            </div>
                        ))}
                         {(!form.metadata.dishes || form.metadata.dishes.length === 0) && (
                             <div className="text-center py-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground border border-dashed border-border">
                                No dishes added yet.
                             </div>
                         )}
                    </div>
                </div>
            )}
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
                Save Vendor
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
