"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { uploadToImageKit } from "../../lib/imagekitUpload";

export interface BannerFormValues {
    title: string;
    image_url: string;
    description: string;
    link_url: string;
    display_order: number;
    is_active: boolean;
}

interface BannerEditModalProps {
    open: boolean;
    initialData?: Partial<BannerFormValues>;
    onClose: () => void;
    onSubmit: (payload: BannerFormValues) => Promise<void>;
}

export default function BannerEditModal({
    open,
    initialData,
    onClose,
    onSubmit,
}: BannerEditModalProps) {
    const [form, setForm] = useState<BannerFormValues>({
        title: "",
        image_url: "",
        description: "",
        link_url: "",
        display_order: 0,
        is_active: true,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewError, setPreviewError] = useState(false);

    const handleFieldChange = (key: keyof BannerFormValues, value: any) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };


    /* 🔁 Autofill */
    useEffect(() => {
        if (open && initialData) {
            setForm({
                title: initialData.title || "",
                image_url: initialData.image_url || "",
                description: initialData.description || "",
                link_url: initialData.link_url || "",
                display_order: initialData.display_order || 0,
                is_active: initialData.is_active ?? true,
            });
        }
    }, [open, initialData]);

    if (!open) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, type, value, checked } = e.target as HTMLInputElement;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? Number(value)
                        : value,
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
                <div className="bg-surface w-full max-w-lg rounded-xl p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-text-muted hover:text-text-main"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-xl font-semibold mb-5">
                        Edit Banner
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="title"
                            placeholder="Title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full input"
                        />

                        {/* <input
              name="image_url"
              placeholder="Image URL"
              value={form.image_url}
              onChange={handleChange}
              required
              className="w-full input"
            /> */}
                        {/* Banner Image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                                Banner Image
                            </label>

                            {/* Preview */}
                            {form.image_url && !previewError && (
                                <img
                                    src={form.image_url}
                                    alt="Banner preview"
                                    onError={() => setPreviewError(true)}
                                    className="h-32 w-full object-cover rounded-lg border"
                                />
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                disabled={uploading}
                                onChange={async (e) => {
                                    if (!e.target.files?.[0]) return;

                                    setUploading(true);

                                    try {
                                        const imageUrl = await uploadToImageKit(
                                            e.target.files[0],
                                            { folder: "/banners" }
                                        );

                                        console.log("Banner image URL:", imageUrl);

                                        handleFieldChange("image_url", imageUrl);
                                        setPreviewError(false);
                                    } catch (err) {
                                        console.error("Image upload failed", err);
                                        alert("Image upload failed");
                                    } finally {
                                        setUploading(false);
                                    }
                                }}
                                className="block w-full text-sm text-muted-foreground
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-primary/10 file:text-primary
      hover:file:bg-primary/20"
                            />

                            {uploading && (
                                <p className="text-xs text-text-muted">Uploading image...</p>
                            )}
                        </div>



                        <textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full input"
                        />

                        {/* <input
              name="link_url"
              placeholder="Redirect URL"
              value={form.link_url}
              onChange={handleChange}
              className="w-full input"
            />

            <input
              type="number"
              name="display_order"
              placeholder="Display Order"
              value={form.display_order}
              onChange={handleChange}
              className="w-full input"
            /> */}

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

                        <button
                            disabled={uploading}
                            type="submit"
                            className="w-full py-3 rounded-xl bg-primary text-white font-semibold cursor-pointer"
                        >
                            Update Banner
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
