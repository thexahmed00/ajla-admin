"use client";

import { useState } from "react";

interface PromoFormProps {
  initialData?: any;           // optional for edit
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export default function PromoForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: PromoFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    display_order: 1,
    image_url: initialData?.image_url || "",
    link_url: initialData?.image_url || "",
    is_active: initialData?.is_active ?? true,
  });
  const [uploading, setUploading] = useState(false);


  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        alert("Session expired. Please login again.");
        return;
      }

      const res = await fetch("/api/banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
          title: form.title,
          description: form.description,
          image_url: form.image_url,
          link_url: form.link_url,
          display_order: Number(form.display_order),
          is_active: form.is_active,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create banner");
      }

      // ✅ Success
      alert("Banner created successfully");
      onSubmit?.(data); // optional callback
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong");
    }
  };

  const handleImageUpload = async (file: File) => {
  setUploading(true);

  try {
    const authRes = await fetch("/api/imagekit-auth");
    const auth = await authRes.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
    formData.append("signature", auth.signature);
    formData.append("expire", auth.expire.toString());
    formData.append("token", auth.token);
    formData.append("useUniqueFileName", "true");
    formData.append("folder", "/promos");

    const res = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      throw new Error(data.message || "Upload failed");
    }

    handleChange("image_url", data.url);
  } catch (err: any) {
    alert(err.message || "Upload failed");
  } finally {
    setUploading(false);
  }
};




  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="text-sm text-gray-400">Title</label>
        <input
          className="w-full mt-1 px-4 py-2 rounded-lg border bg-secondary"
          placeholder="Summer Sale 50% Off"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-400">Description</label>
        <textarea
          className="w-full mt-1 px-4 py-2 rounded-lg border bg-secondary resize-none"
          rows={3}
          placeholder="Check out our summer collection..."
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Image URL */}
      {/* <div>
        <label className="text-sm text-gray-400">Image URL</label>
        <input
          className="w-full mt-1 px-4 py-2 rounded-lg border bg-secondary"
          placeholder="https://image.jpg"
          value={form.image_url}
          onChange={(e) => handleChange("image_url", e.target.value)}
        />
      </div> */}
      <div>
        <label className="text-sm text-gray-400">Upload Image</label>

        <input
          type="file"
          accept="image/*"
          className="w-full mt-1"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleImageUpload(e.target.files[0]);
            }
          }}
        />

        {uploading && (
          <p className="text-xs text-gray-400 mt-1">Uploading image...</p>
        )}
      </div>


      {/* Image Preview */}
      {form.image_url && (
        <img
          src={form.image_url}
          alt="Preview"
          className="w-full h-40 object-cover rounded-lg border"
          onError={(e) => ((e.currentTarget.style.display = "none"))}
        />
      )}

      {/* Link URL */}
      {/* <div>
        <label className="text-sm text-gray-400">Link URL</label>
        <input
          className="w-full mt-1 px-4 py-2 rounded-lg border bg-secondary"
          placeholder="app://promo/summer-2025"
          value={form.link_url}
          onChange={(e) => handleChange("link_url", e.target.value)}
        />
      </div> */}

      {/* Display Order */}
      {/* <div>
        <label className="text-sm text-gray-400">Display Order</label>
        <input
          type="number"
          className="w-full mt-1 px-4 py-2 rounded-lg border bg-secondary"
          value={form.display_order}
          onChange={(e) =>
            handleChange("display_order", Number(e.target.value))
          }
        />
      </div> */}

      {/* Active Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => handleChange("is_active", e.target.checked)}
        />
        <span className="text-sm">Active</span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-primary text-white"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
