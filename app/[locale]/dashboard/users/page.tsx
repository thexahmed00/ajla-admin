"use client";

import Link from "next/link";
import { Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Pencil, Trash2, CheckCircle, XCircle, Phone } from "lucide-react";
import UserFormModal, { UserFormValues } from "../components/UserFormModal";

interface UserType {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone_number: string;
    is_active: boolean;
    is_admin: boolean;
    tier: number;
    created_at: string;
    updated_at: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [selectedUser, setSelectedUser] = useState<UserType | undefined>(undefined);

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const fetchUsers = async () => {
        const token = localStorage.getItem("access_token");
        const res = await fetch("/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.items || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    const createUser = async (payload: any, token: string) => {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw await res.json();
        }
        alert("User created successfully");
        return res.json();
    };

    const updateUser = async (payload: any, token: string) => {
        console.log("payload", payload)
        const res = await fetch("/api/userupdate", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw await res.json();
        }

        return res.json();
    };


const deleteUser = async (id: number) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch("/api/deleteuser", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    throw await res.json();
  }
  fetchUsers();
  alert("User deleted successfully");
  return res.json();
};


    return (
        <div className="space-y-6 overflow-x-hidden max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 hidden md:flex">
                        <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-poppins font-bold text-2xl md:text-3xl text-text-main">
                            Users
                        </h1>
                        <p className="text-text-muted text-sm md:text-base mt-1">
                            Manage Users
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setSelectedUser(undefined);
                        setMode("create");
                        setModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl 
          bg-gradient-to-r from-primary to-primary-hover text-surface font-semibold 
          hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
          active:translate-y-0 transition-all duration-200 group"
                >
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
                    Create User
                </button>
            </div>

            {/* Table */}
            <table className="hidden md:table w-full text-sm">
                <thead className="bg-surface-hover/40 text-text-muted border-b border-border">
                    <tr>
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Name
                        </th>
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Email
                        </th>
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Phone
                        </th>
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Tier
                        </th>
                        <th className="px-6 py-4 text-left font-medium uppercase text-[11px] tracking-widest">
                            Status
                        </th>
                        <th className="px-6 py-4 text-right font-medium uppercase text-[11px] tracking-widest">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="text-center py-8 text-text-muted">
                                Loading users...
                            </td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-8 text-text-muted">
                                No users found
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr
                                key={user.id}
                                className="hover:bg-surface-hover/50 transition-colors duration-200 group"
                                style={{
                                    animation: "fadeIn 0.4s ease-out forwards",
                                    animationDelay: `${index * 0.05}s`,
                                    opacity: 0,
                                }}
                            >
                                <td className="px-6 py-4">{user.full_name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 flex items-center gap-1.5">
                                    <Phone className="w-4 h-4 text-primary" />
                                    {user.phone_number}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/10">
                                        Tier {user.tier}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {user.is_active ? (
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
                                <td className="px-6 py-4">
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border"
                                            onClick={() => {
                                                console.log("user", user)
                                                setSelectedUser(user);
                                                setMode("edit");
                                                setModalOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>


                                        <button
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/10 transition-all duration-200"
                                            title="Delete"
                                            onClick={() => deleteUser(user.id)}
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

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="text-center py-8 text-text-muted">
                        Loading users...
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-8 text-text-muted">
                        No users found
                    </div>
                ) : (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-surface rounded-xl border border-border p-4 space-y-3 shadow-sm"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-text-main">{user.full_name}</p>
                                    <p className="text-xs text-text-muted">{user.email}</p>
                                </div>
                                {user.is_active ? (
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/10">
                                        Active
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/10">
                                        Inactive
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4 text-primary" />
                                    <span>{user.phone_number}</span>
                                </div>
                                <div>
                                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/10">
                                        Tier {user.tier}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-3 border-t border-border">
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-text-muted hover:text-primary transition"
                                    onClick={() => {
                                        console.log("user", user)
                                        setSelectedUser(user);
                                        setMode("edit");
                                        setModalOpen(true);
                                    }}
                                >
                                    <Pencil className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/10 transition"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <UserFormModal
                open={modalOpen}
                mode={mode}
                initialData={selectedUser}
                onClose={() => setModalOpen(false)}
                onSubmit={async (payload) => {
                    try {
                        const token = localStorage.getItem("access_token");
                        if (!token) throw new Error("Token missing");
                        // console.log("token", token)
                        // console.log("payload", payload)
                        if (mode === "create") {
                            await createUser(payload, token);
                        } else {
                            console.log("selectedUser",selectedUser?.id)
                            console.log("selectedUser",payload)
                            await updateUser(
                                { ...payload, id: selectedUser?.id },
                                token
                            );
                        }

                        await fetchUsers();
                        setModalOpen(false);
                    } catch (err) {
                        console.error(err);
                        alert("Something went wrong");
                    }
                }}
            />



        </div>
    );
}
