"use client";
import { uploadToImageKit } from "@/app/[locale]/lib/imagekitUpload";
import { useState, useEffect } from "react";

interface CategoryForm {
  id?: number;
  slug: string;
  name: string;
  display_order: number;
  icon_url: string;
}

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryForm) => void;
  editingData: CategoryForm | null;
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
  const [subCategory, setSubCategory] = useState({
    name: "",
    // slug: "",
    display_order: 0,
    icon_url: editingData?.icon_url
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

  useEffect(() => {
    if (!open) return;

    if (!editingData) {
      setSubCategory({
        // slug: "",
        name: "",
        display_order: 0,
        icon_url: ""
      });
    }
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

      const isEdit = Boolean(editingData && 'id' in editingData && editingData.id);

      const url = isEdit
        ? "/api/editcategory"
        : "/api/categories";

      const method = isEdit ? "PUT" : "POST";

      const payload = isEdit && editingData
        ? {
          id: editingData.id,
          name: form.name.trim(),
          icon_url: form.icon_url.trim(),
        }
        : {
          name: form.name.trim(),
          icon_url: form.icon_url.trim(),
          category_ids: selectedIds
        };
      console.log("payload", payload)
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
      // refresh list

      onClose();    // close modal

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const [subCatLoading, setSubCatLoading] = useState(false);
  async function createSubCategory() {
    setSubCatLoading(true)
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Unauthorized");
    }
    let payload = {
      category_id: editingData?.id,
      name: subCategory.name,
      slug: subCategory?.name,
      display_order: 0,
      icon_url: editingData?.icon_url || ""
    }
    console.log("payload", payload)
    const res = await fetch("/api/subcategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    // await loadMore(); 

    setSubCatLoading(false)

    if (!res.ok) {
      setSubCatLoading(false)
      throw new Error(data?.message || "Failed to create subcategory");
    }
    fetchSubcategories()
    return data;
  }

  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [subLoading, setSubLoading] = useState(false);
  const [openSubCat, setOpenSubCat] = useState(false);
  const [showSubCatForm, setShowSubCatForm] = useState(false);




  const fetchSubcategories = async (page = 1) => {
    const token = localStorage.getItem("access_token");

    const res = await fetch(`/api/subcategories?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setSubcategories(data.subcategories || []);
    if (!res.ok) throw new Error("Failed to load subcategories");

    // return res.json();
  };

  useEffect(() => {
    fetchSubcategories(page)
  }, []);
  useEffect(() => {
  if (!editingData) {
    setShowSubCatForm(false);
  }
}, [editingData]);


  // const loadMore = async () => {
  //   if (loading) return;
  //   setLoading(true);

  //   const data = await fetchSubcategories(page);

  // setSubcategories(prev => [
  //   ...prev,
  //   ...(data.subcategories || []),
  // ]);

  //   setPage(prev => prev + 1);
  //   setLoading(false);
  // };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
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
          {!editingData &&
            <div className="relative w-full">
              {/* Trigger */}
              <button
                type="button"
                onClick={() => setOpenSubCat(v => !v)}
                className="
      w-full flex justify-between items-center
      px-4 py-2 rounded-lg
      border border-border bg-secondary
      text-sm
      hover:bg-secondary/80
      bg-black/100
    "
              >
                <span className="truncate">
                  {selectedIds.length > 0
                    ? `${selectedIds.length} subcategories selected`
                    : "Select subcategories"}
                </span>

                <span
                  className={`transition ${openSubCat ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>

              {/* Dropdown */}
              {openSubCat && (
                <div
                  // onScroll={(e) => {
                  //   const el = e.currentTarget;
                  //   if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
                  //     loadMore();
                  //   }
                  // }}
                  className="
        absolute z-50 mt-2 w-full
        max-h-64 overflow-y-auto
        rounded-xl border border-border
        bg-black/100 shadow-lg
      "
                >
                  {/* Header */}
                  <div className="sticky top-0 bg-secondary px-3 py-2 border-b border-border">
                    <p className="text-xs text-text-muted">
                      Sub Categories
                    </p>
                  </div>

                  {/* List */}
                  <div className="p-2 space-y-1">
                    {subcategories.length === 0 && !loading && (
                      <p className="text-sm text-text-muted text-center py-6">
                        No subcategories found
                      </p>
                    )}

                    {subcategories.map(item => {
                      const isSelected = selectedIds.includes(item.id);

                      return (
                        <label
                          key={item.id}
                          className={`
                flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                transition
                ${isSelected
                              ? "bg-primary/10 border border-primary/30"
                              : "hover:bg-white/5"
                            }
              `}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(item.id)}
                            className="h-4 w-4 text-primary"
                          />
                          <span className="text-sm">{item.name}</span>
                        </label>
                      );
                    })}

                    {loading && (
                      <div className="text-center py-3 text-xs text-text-muted animate-pulse">
                        Loading more…
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          }


          {editingData && (
  <div className="pt-4 border-t border-border space-y-3">
    {/* Toggle Button */}
    <button
      type="button"
      onClick={() => setShowSubCatForm(prev => !prev)}
      className="
        w-full flex items-center justify-center gap-2
        px-4 py-2 rounded-lg
        border border-border
        text-sm
        hover:bg-secondary transition
      "
    >
      {showSubCatForm ? "Cancel Subcategory" : "+ Add Subcategory"}
    </button>

    {/* Subcategory Form */}
    {showSubCatForm && (
      <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
        <h3 className="text-sm font-semibold text-text-muted">
          Create Subcategory
        </h3>

        {/* Subcategory Name */}
        <div>
          <label className="text-sm text-text-muted">
            Subcategory Name
          </label>
          <input
            className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-secondary"
            value={subCategory.name}
            onChange={(e) =>
              setSubCategory(prev => ({
                ...prev,
                name: e.target.value
              }))
            }
            placeholder="Enter Subcategory Name"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={createSubCategory}
            disabled={subCatLoading || !subCategory.name}
            className="
              px-4 py-2 rounded-lg
              border border-primary
              text-primary
              hover:bg-primary/10
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            {subCatLoading ? "Submitting..." : "Create Subcategory"}
          </button>
        </div>
      </div>
    )}
  </div>
)}

          {/* Icon URL */}
          <div>
            <label className="text-sm text-text-muted">Icon</label>
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
                  console.log("url", imageUrl)
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
