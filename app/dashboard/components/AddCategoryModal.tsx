"use client";
import { uploadToImageKit } from "@/app/lib/imagekitUpload";
import { useState, useEffect } from "react";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editingData: any | null;
}

export default function AddCategoryModal({
  open,
  onClose,
  onSubmit,
  editingData
}: AddCategoryModalProps) {
  const [form, setForm] = useState({
    slug: "",
    name: "",
    display_order: 0,
    icon_url: ""
  });
  // console.log("editing data",editingData.id)
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (editingData) {
      // EDIT MODE → Prefill
      setForm({
        slug: editingData.slug || "",
        name: editingData.name || "",
        display_order: editingData.display_order || 0,
        icon_url: editingData.icon_url || "",
      });
    } else {
      // ADD MODE → Empty
      setForm({
        slug: "",
        name: "",
        display_order: 0,
        icon_url: "",
      });
    }

    setPreviewError(false);
  }, [open, editingData]);


  const handleChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Unauthorized");
        return;
      }

      const isEdit = Boolean(editingData?.id);

      const url = isEdit
        ? "/api/editcategory"
        : "/api/categories";

      const method = isEdit ? "PUT" : "POST";

      const payload = isEdit
        ? {
          id: editingData.id,
          name: form.name.trim(),
          icon_url: form.icon_url.trim(),
        }
        : {
          name: form.name.trim(),
          icon_url: form.icon_url.trim(),
        };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Request failed");
        return;
      }

      alert(isEdit ? "Category Updated Successfully" : "Category Created Successfully");

      // onSubmit();   // refresh list
      onClose();    // close modal

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };




  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-black/100 border border-border rounded-2xl shadow-xl w-[95%] max-w-xl p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {editingData ? "Update Category" : "Add New Category"}
          </h2>


          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center border border-border hover:bg-secondary transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg">
          {/* Slug */}
          {/* <div>
            <label className="text-sm text-text-muted">Slug</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:ring-1 focus:ring-primary outline-none"
              placeholder="boats"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              required
            />
          </div> */}

          {/* Name */}
          <div>
            <label className="text-sm text-text-muted">Name</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:ring-1 focus:ring-primary outline-none"
              placeholder="Boats"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          {/* Display Order */}
          {/* <div>
            <label className="text-sm text-text-muted">Display Order</label>
            <input
              type="number"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:ring-1 focus:ring-primary outline-none"
              value={form.display_order}
              onChange={(e) => handleChange("display_order", e.target.value)}
              required
            />
          </div> */}

          {/* Icon URL */}
          <div>
            <label className="text-sm text-text-muted">Icon URL</label>
            {/* <input
              className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:ring-1 focus:ring-primary outline-none"
              placeholder="https://icon.png"
              value={form.icon_url}
              onChange={(e) => {
                handleChange("icon_url", e.target.value);
                setPreviewError(false);
              }}
            /> */}


            <input
              type="file"
              accept="image/*"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:ring-1 focus:ring-primary outline-none"

              onChange={async (e) => {
                if (!e.target.files?.[0]) return;

                setUploading(true);

                try {
                  const imageUrl = await uploadToImageKit(e.target.files[0], {
                    folder: "/icons",
                  });
                  console.log("url",imageUrl)
                  handleChange("icon_url", imageUrl);
                  setPreviewError(false);
                } catch (err) {
                  console.error(err);
                } finally {
                  setUploading(false);
                }
              }}
            />

          </div>

          {/* Preview */}
          {form.icon_url && (
            <div className="mt-2 flex items-center gap-3">
              {!previewError ? (
                <img
                  src={form.icon_url}
                  alt="Icon Preview"
                  className="w-16 h-16 object-cover rounded border border-border"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center text-xs text-red-500 border border-red-400 rounded">
                  Invalid Image
                </div>
              )}
              <span className="text-sm text-text-muted">Preview</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
            >
              {loading
                ? editingData ? "Updating..." : "Adding..."
                : editingData ? "Update Category" : "Add Category"}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
