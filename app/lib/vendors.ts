export async function fetchVendors(category_slug: string, skip = 0, limit = 20) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(
    `/api/vendors?category_slug=${category_slug}&skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vendors");
  }

  return res.json();
}
