"use client";

import PromoForm from "./HomePageBanner";

interface BannerData {
  id?: number;
  title: string;
  description: string;
  image_url: string;
  link_url?: string;
  display_order?: number;
  is_active?: boolean;
}

interface HomePageBannerModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: BannerData;
}

export default function HomePageBannerModal({
  open,
  onClose,
  initialData,
}: HomePageBannerModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[95%] max-w-2xl bg-black border border-border rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {initialData ? "Update Home Page Banner" : "Add Home Page Banner"}
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center border border-border hover:bg-secondary transition"
          >
            ✕
          </button>
        </div>

        <PromoForm
          initialData={initialData}
          onSubmit={(data) => {
            console.log("Banner Payload:", data);
            onClose();
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
