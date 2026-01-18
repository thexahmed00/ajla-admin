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
  price: 0,
  duration_days: 0,
  tier: 0,
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
  const [form, setForm] = useState(emptyForm);

  /** 🔥 Prefill logic */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        duration_days: initialData.duration_days,
        tier: initialData.tier,
        features: initialData.features.length
          ? initialData.features
          : [""],
        is_active: initialData.is_active,
      });
    }

    if (mode === "create") {
      setForm(emptyForm);
    }
  }, [mode, initialData, open]);

  if (!open) return null;

  const updateField = (key: string, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const updateFeature = (i: number, value: string) => {
    const updated = [...form.features];
    updated[i] = value;
    updateField("features", updated);
  };


  const Input = ({ label, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-widest text-text-muted">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-lg bg-surface-hover px-4 py-2 text-sm outline-none border border-border focus:border-primary"
    />
  </div>
);

const Textarea = ({ label, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-widest text-text-muted">
      {label}
    </label>
    <textarea
      {...props}
      rows={3}
      className="w-full rounded-lg bg-surface-hover px-4 py-2 text-sm outline-none border border-border focus:border-primary resize-none"
    />
  </div>
);


  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-surface border border-border shadow-xl animate-scaleIn">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-main">
            {mode === "create" ? "Create Plan" : "Edit Plan"}
          </h2>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-surface-hover flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <Input label="Plan Name" value={form.name} onChange={(e:any) => updateField("name", e.target.value)} />
          <Textarea label="Description" value={form.description} onChange={(e:any) => updateField("description", e.target.value)} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Price" type="number" value={form.price} onChange={(e:any) => updateField("price", +e.target.value)} />
            <Input label="Duration (days)" type="number" value={form.duration_days} onChange={(e:any) => updateField("duration_days", +e.target.value)} />
          </div>

          <Input label="Tier" type="number" value={form.tier} onChange={(e:any) => updateField("tier", +e.target.value)} />

          {/* Features */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-text-muted">
              Features
            </label>

            {form.features.map((f, i) => (
              <input
                key={i}
                value={f}
                onChange={e => updateFeature(i, e.target.value)}
                className="w-full rounded-lg bg-surface-hover px-4 py-2 text-sm border border-border focus:border-primary outline-none"
              />
            ))}

            <button
              onClick={() => updateField("features", [...form.features, ""])}
              className="text-primary text-sm font-medium inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={e => updateField("is_active", e.target.checked)}
              className="accent-primary"
            />
            <span className="text-sm">Active</span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-surface-hover"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:opacity-90"
          >
            {mode === "create" ? "Create Plan" : "Update Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
