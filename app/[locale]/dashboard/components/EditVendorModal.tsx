"use client";
import { useState } from "react";

export default function EditVendorModal({ vendor, onClose, }: any) {
    console.log("EDIT VENDOR", vendor);
  const [form, setForm] = useState({
    name: vendor.name,
    description: vendor.description || "",
    fullDescription: vendor.fullDescription || "",
    address: vendor.address || "",
    phone: vendor.phone || "",
    whatsapp: vendor.whatsapp || "",
    website: vendor.website || "",
    rating: vendor.rating || "",
    status: vendor.status?.toLowerCase() || "active",
    metadata: vendor.metadata || {},
  });

  const updateField = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateVendor = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/vendors/update/${vendor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log("UPDATED", data);

    //   refresh();     // reload table
      onClose();     // close modal

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-surface p-6 rounded-2xl w-full max-w-2xl shadow-xl border border-border">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Vendor</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1">

          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={e => updateField("name", e.target.value)}
          />

          <input
            className="input"
            placeholder="Rating"
            value={form.rating}
            onChange={e => updateField("rating", e.target.value)}
          />

          <textarea
            className="input col-span-2"
            placeholder="Short Description"
            value={form.description}
            onChange={e => updateField("description", e.target.value)}
          />

          <textarea
            className="input col-span-2"
            placeholder="Full Description"
            value={form.fullDescription}
            onChange={e => updateField("fullDescription", e.target.value)}
          />

          <input className="input"
            placeholder="Phone"
            value={form.phone}
            onChange={e => updateField("phone", e.target.value)}
          />

          <input className="input"
            placeholder="WhatsApp"
            value={form.whatsapp}
            onChange={e => updateField("whatsapp", e.target.value)}
          />

          <input className="input col-span-2"
            placeholder="Website"
            value={form.website}
            onChange={e => updateField("website", e.target.value)}
          />

          <input className="input col-span-2"
            placeholder="Address"
            value={form.address}
            onChange={e => updateField("address", e.target.value)}
          />

          {/* STATUS */}
          <select
            className="input col-span-2"
            value={form.status}
            onChange={e => updateField("status", e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* ----------- METADATA EDIT ----------- */}
          <textarea
            className="input col-span-2"
            placeholder="Metadata (JSON)"
            value={JSON.stringify(form.metadata, null, 2)}
            onChange={e => {
              try {
                updateField("metadata", JSON.parse(e.target.value));
              } catch {
                console.log("Invalid JSON typing");
              }
            }}
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleUpdateVendor}>
            Update Vendor
          </button>
        </div>
      </div>
    </div>
  );
}
