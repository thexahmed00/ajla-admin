"use client";

import { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { PlanTier } from "../types/plan";

export interface UserFormValues {
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number: string;
    password?: string;
    tier: PlanTier | null;
    is_active: boolean;
    is_admin: boolean;
}

interface UserFormModalProps {
    open: boolean;
    mode: "create" | "edit";
    initialData?: Partial<UserFormValues>;
    onClose: () => void;
    onSubmit: (payload: UserFormValues) => Promise<void>;
}

export default function UserFormModal({
    open,
    mode,
    initialData,
    onClose,
    onSubmit,
}: UserFormModalProps) {
    const [form, setForm] = useState<UserFormValues>({
        email: "",
        first_name: "",
        last_name: "",
        full_name: "",
        phone_number: "",
        tier: null,
        is_active: true,
        is_admin: false,
    });
    const [showPassword, setShowPassword] = useState(false);


    /* 🔁 Autofill on edit */
    useEffect(() => {
        if (open && initialData) {
            setForm({
                email: initialData.email || "",
                first_name: initialData.first_name || "",
                last_name: initialData.last_name || "",
                full_name: initialData.full_name || "",
                phone_number: initialData.phone_number || "",
                tier: initialData.tier || null,
                is_active: initialData.is_active ?? true,
                is_admin: initialData.is_admin ?? false,
            });
        }

        if (open && !initialData) {
            setForm({
                email: "",
                first_name: "",
                last_name: "",
                full_name: "",
                phone_number: "",
                tier: null,
                is_active: true,
                is_admin: false,
            });
        }
    }, [open, initialData]);

    if (!open) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(form);
    };


    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-surface w-full max-w-lg rounded-xl p-6 relative animate-fadeIn">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-text-muted hover:text-text-main"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-xl font-semibold text-text-main mb-5">
                        {mode === "create" ? "Create User" : "Edit User"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Names */}
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                name="first_name"
                                placeholder="First name"
                                value={form.first_name}
                                onChange={handleChange}
                                required
                                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-muted-foreground/40"

                            />
                            <input
                                name="last_name"
                                placeholder="Last name"
                                value={form.last_name}
                                onChange={handleChange}
                                required
                                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-muted-foreground/40"

                            />
                        </div>

                       {mode === "create" && <input
                            name="full_name"
                            placeholder="Full name"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-muted-foreground/40"

                        />}

                        {mode === "create" && <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-muted-foreground/40"

                        />}
                        {/* Password */}
                        {mode === "create" && <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={form.password || ""}
                                onChange={handleChange}
                                required={mode === "create"}
                                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 pr-12 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-muted-foreground/40"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>}


                        <input
                            name="phone_number"
                            placeholder="Phone number"
                            value={form.phone_number}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-muted-foreground/40"

                        />
                        <label className="text-sm font-medium text-text-main">
                            Tier
                        </label>
                        <select
                            name="tier"
                            value={form.tier ?? ''}
                            onChange={(e) => setForm(prev => ({ ...prev, tier: e.target.value === '' ? null : e.target.value as PlanTier }))}
                            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        >
                            <option value="">No Tier</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Traveller">Traveller</option>
                            <option value="Elite">Elite</option>
                        </select>

                        {/* Toggles */}
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={form.is_active}
                                    onChange={handleChange}
                                    className="accent-primary"
                                />
                                Active
                            </label>

                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="is_admin"
                                    checked={form.is_admin}
                                    onChange={handleChange}
                                    className="accent-primary"
                                />
                                Admin
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-semibold hover:shadow-lg hover:shadow-primary/30 transition"
                        >
                            {mode === "create" ? "Create User" : "Update User"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
