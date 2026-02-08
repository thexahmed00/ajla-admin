"use client";

import { X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Plan } from "../types/plan";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialData?: Plan | null;
  onClose: () => void;
  onSubmit: (data: Partial<Plan>) => void;
};

const emptyForm = {
  name: "",
  description: "",
  price: "",
  duration_days: "",
  tier: "",
  features: [""],
  is_active: true,
};

export default function PlanFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<any>(emptyForm);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        price: initialData.price ?? "",
        duration_days: initialData.duration_days ?? "",
        tier: initialData.tier ?? "",
        features: initialData.features?.length
          ? initialData.features
          : [""],
        is_active: initialData.is_active ?? true,
      });
    }

    if (mode === "create") {
      setForm(emptyForm);
    }
  }, [mode, initialData, open]);

  if (!open) return null;

  const updateField = (key: string, value: any) =>
    setForm((prev: any) => ({ ...prev, [key]: value }));

  const updateFeature = (i: number, value: string) => {
    const updated = [...form.features];
    updated[i] = value;
    updateField("features", updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-surface border border-border shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold">
            {mode === "create" ? "Create Plan" : "Edit Plan"}
          </h2>

          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-0">

          {/* Name */}
          <div>
            <label className="text-xs uppercase tracking-widest text-text-muted">
              Plan Name
            </label>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs uppercase tracking-widest text-text-muted">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg resize-none"
            />
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-text-muted">
                Price
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  updateField(
                    "price",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-text-muted">
                Duration (days)
              </label>
              <input
                type="number"
                value={form.duration_days}
                onChange={(e) =>
                  updateField(
                    "duration_days",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Tier */}
          <div>
            <label className="text-xs uppercase tracking-widest text-text-muted">
              Tier
            </label>
            <select
              value={form.tier}
              onChange={(e) => updateField("tier", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            >
              <option value="">Select Tier</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Traveller">Traveller</option>
              <option value="Elite">Elite</option>
            </select>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-text-muted">
              Features
            </label>

            {form.features.map((f: string, i: number) => (
              <input
                key={i}
                value={f}
                onChange={(e) => updateFeature(i, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            ))}

            <button
              type="button"
              onClick={() => updateField("features", [...form.features, ""])}
              className="text-primary text-sm inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </div>

          {/* Active */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => updateField("is_active", e.target.checked)}
            />
            <span className="text-sm">Active</span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            {mode === "create" ? "Create Plan" : "Update Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
