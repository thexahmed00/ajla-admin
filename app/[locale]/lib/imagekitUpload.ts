interface ImageKitUploadOptions {
  folder?: string;
  fileName?: string;
  useUniqueFileName?: boolean;
}

export async function uploadToImageKit(
  file: File,
  options: ImageKitUploadOptions = {}
): Promise<string> {
  const {
    folder = "/uploads",
    fileName = file.name,
    useUniqueFileName = true,
  } = options;

  // 1. Get auth params from backend
  const authRes = await fetch("/api/imagekit-auth");
  if (!authRes.ok) {
    throw new Error("Failed to get ImageKit auth");
  }

  const auth = await authRes.json();

  // 2. Prepare upload payload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append(
    "publicKey",
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!
  );
  formData.append("signature", auth.signature);
  formData.append("expire", auth.expire.toString());
  formData.append("token", auth.token);
  formData.append("useUniqueFileName", String(useUniqueFileName));
  formData.append("folder", folder);

  // 3. Upload to ImageKit
  const uploadRes = await fetch(
    "https://upload.imagekit.io/api/v1/files/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await uploadRes.json();

  if (!uploadRes.ok) {
    throw new Error(data?.message || "Image upload failed");
  }

  // 4. Return uploaded image URL
  return data.url as string;
}
