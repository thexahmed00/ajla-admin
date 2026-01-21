"use client";

import Link from "next/link";
import { Plus, Store } from "lucide-react";
import { Plan } from "../types/plan";
import { useEffect, useState } from "react";
import { Pencil, Trash2, CheckCircle, XCircle, Clock, IndianRupee, SaudiRiyal } from "lucide-react";
import PlanFormModal from "../components/PlanFormModal";


export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [selectedPlan, setSelectedPlan] = useState<any>(null);


    const fetchPlans = async () => {
        const token = localStorage.getItem("access_token");

        const res = await fetch("/api/plans", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Failed to fetch plans");
        return res.json();
    };

    useEffect(() => {
        fetchPlans()
            .then((data) => {
                setPlans(data.plans);
            })
            .finally(() => setLoading(false));
    }, []);


    async function createPlan(payload: Partial<Plan>) {
        let token = localStorage.getItem("access_token")
        const res = await fetch("/api/plans", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to create plan");
        }
        fetchPlans()
            .then((data) => {
                setPlans(data.plans);
            })
            .finally(() => setLoading(false));
        return res.json();
    }


    async function updatePlan(payload: any) {
        const token = localStorage.getItem("access_token");

        const res = await fetch("/api/updateplan", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload), // includes id
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Update failed");
        }
        fetchPlans()
            .then((data) => {
                setPlans(data.plans);
            })
            .finally(() => setLoading(false));

        return res.json();
    }


    async function deletePlan(id: number | string) {
        console.log("Deleting plan with id:", id);
  const token = localStorage.getItem("access_token");

  const res = await fetch("/api/deleteplan", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  // ✅ 204 = success, no body
  if (res.status === 204) {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    return true;
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Delete failed");
  }

  return true;
}



    // async function updatePlan(
    //   planId: number | string,
    //   payload: Partial<Plan>
    // ) {
    //   const res = await fetch(`${API_BASE}/${planId}`, {
    //     method: "PUT", // or PATCH (based on backend)
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${getToken()}`,
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!res.ok) {
    //     const err = await res.json();
    //     throw new Error(err.message || "Failed to update plan");
    //   }

    //   return res.json();
    // }




    return (
        <div className="space-y-6 overflow-x-hidden max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 hidden md:flex">
                        <Store className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-poppins font-bold text-2xl md:text-3xl text-text-main">
                            Plans
                        </h1>
                        <p className="text-text-muted text-sm md:text-base mt-1">
                            Manage Plans
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setSelectedPlan(null);
                        setMode("create");
                        setModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl 
          bg-gradient-to-r from-primary to-primary-hover text-surface font-semibold 
          hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
          active:translate-y-0 transition-all duration-200 group"
                >
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
                    Create Plan
                </button>
            </div>

            <table className="hidden md:table w-full text-sm">
                <thead className="bg-surface-hover/40 text-text-muted border-b border-border">
                    <tr>
                        {/* Plan */}
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Plan
                        </th>

                        {/* Price */}
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Price
                        </th>

                        {/* Duration */}
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Duration
                        </th>

                        {/* Tier */}
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Tier
                        </th>

                        {/* Status */}
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Status
                        </th>

                        {/* Actions */}
                        <th className="px-6 py-4 text-right font-medium uppercase text-[11px] tracking-widest">
                            Actions
                        </th>
                    </tr>
                </thead>


                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="text-center py-8 text-text-muted">
                                Loading plans...
                            </td>
                        </tr>
                    ) : plans.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-8 text-text-muted">
                                No plans found
                            </td>
                        </tr>
                    ) : (
                        plans.map((plan, index) => (
                            <tr
                                key={plan.id}
                                className="hover:bg-surface-hover/50 transition-colors duration-200 group"
                                style={{
                                    animation: "fadeIn 0.4s ease-out forwards",
                                    animationDelay: `${index * 0.05}s`,
                                    opacity: 0,
                                }}
                            >
                                {/* Plan Info */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium text-text-main group-hover:text-primary transition-colors">
                                            {plan.name}
                                        </p>
                                        <p className="text-xs text-text-muted line-clamp-1 max-w-[240px]">
                                            {plan.description}
                                        </p>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 font-medium text-text-main">
                                        {plan.price}
                                        <SaudiRiyal className="w-4 h-4 text-primary" />
                                    </span>
                                </td>

                                {/* Duration */}
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/10">
                                        <Clock className="w-3.5 h-3.5" />
                                        {plan.duration_days} days
                                    </span>
                                </td>

                                {/* Tier */}
                                <td className="px-6 py-4">
                                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/10">
                                        Tier {plan.tier}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    {plan.is_active ? (
                                        <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/10 items-center gap-1.5">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/10 items-center gap-1.5">
                                            <XCircle className="w-3.5 h-3.5" />
                                            Inactive
                                        </span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-200"
                                            title="Edit"
                                            //   onClick={() => editPlan(plan)}
                                            onClick={() => {
                                                setSelectedPlan(plan);
                                                setMode("edit");
                                                setModalOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>

                                        <button
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/10 transition-all duration-200"
                                            title="Delete"
                                        //   onClick={() => deletePlan(plan.id)}
                                        onClick={()=>deletePlan(plan?.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
            <PlanFormModal
                open={modalOpen}
                mode={mode}
                initialData={selectedPlan}
                onClose={() => setModalOpen(false)}
                onSubmit={async (payload) => {
                    try {
                        if (mode === "create") {
                            console.log("Create payload", payload);

                            await createPlan({
                                ...payload,
                                price: Number(payload.price),
                                duration_days: Number(payload.duration_days),
                                tier: Number(payload.tier),
                                features: payload.features?.filter(Boolean),
                            });
                        } else {
                            console.log("Update payload", payload);

                            await updatePlan({
                                id: selectedPlan.id, // ✅ REQUIRED
                                ...payload,
                                price: Number(payload.price),
                                duration_days: Number(payload.duration_days),
                                tier: Number(payload.tier),
                                features: payload.features?.filter(Boolean),
                            });
                        }

                        setModalOpen(false);
                    } catch (err) {
                        console.error(err);
                    }
                }}
            />


        </div>
    );
}
