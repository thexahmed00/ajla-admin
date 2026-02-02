"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HomePageBannerModal from "../components/BannerFormModal";
import { Pencil, Trash, Trash2 } from "lucide-react";
import BannerEditModal from "../components/BannerEditModal";
interface Banner {
    id: number;
    title: string;
    image_url: string;
    description: string;
    link_url: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

const BannersPage = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(false);
    const [bannerOpen, setBannerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState<any>(null);


    const fetchBanners = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("access_token");

            const res = await fetch("/api/banners", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch banners");

            const data = await res.json();
            setBanners(data.banners || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);


    const deleteBanner = async (id: number) => {
        const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Unauthorized");
  }
  const res = await fetch("/api/deletebanner", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to delete banner");
  }

  // backend returns plain string
  return res.text();
};

const handleDelete = async (id: number) => {
  try {
    await deleteBanner(id);
    alert("Banner deleted successfully");
    fetchBanners();
  } catch (err: any) {
    alert(err.message);
  }
};






    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Banners</h1>
                <button
                    onClick={() => setBannerOpen(true)}
                    className="px-4 py-2 rounded-lg bg-primary text-white">
                    Add Banner
                </button>
            </div>

            <div className="bg-surface rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-secondary text-left">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Order</th>
                            <th className="p-4">Active</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : banners.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center">
                                    No banners found
                                </td>
                            </tr>
                        ) : (
                            banners.map((banner) => (
                                <tr
                                    key={banner.id}
                                    className="border-t border-border"
                                >
                                    <td className="p-4">
                                        <img
                                            src={banner.image_url}
                                            alt={banner.title}
                                            width={80}
                                            height={40}
                                            className="rounded-md object-cover"
                                        />
                                    </td>
                                    <td className="p-4">{banner.title}</td>
                                    <td className="p-4">{banner.display_order}</td>
                                    <td className="p-4">
                                        {banner.is_active ? "Yes" : "No"}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedBanner(banner);
                                                    setModalOpen(true);
                                                }}
                                                className="text-primary flex items-center gap-1 cursor-pointer">
                                                <Pencil className="w-4 h-4" />

                                            </button>
                                            <button
                                            onClick={()=>handleDelete(banner?.id)}
                                            className="text-red-500 cursor-pointer flex items-center gap-1">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <HomePageBannerModal
                open={bannerOpen}
                onClose={() => setBannerOpen(false)}
            />
            <BannerEditModal
                open={modalOpen}
                initialData={selectedBanner}
                onClose={() => setModalOpen(false)}
                onSubmit={async (payload) => {
                    try {
                        const token = localStorage.getItem("access_token");

                        const res = await fetch("/api/updatebanner", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                id: selectedBanner.id,
                                ...payload,
                            }),
                        });

                        if (!res.ok) throw new Error("Update failed");

                        await fetchBanners();
                        setModalOpen(false);
                    } catch (err) {
                        console.error(err);
                        alert("Failed to update banner");
                    }
                }}
            />

        </div>
    );
};

export default BannersPage;
