export async function fetchVendors(category_slug?: string, skip = 0, limit = 20) {
  const token = localStorage.getItem("access_token");

  let url = `/api/vendors?skip=${skip}&limit=${limit}`;

  // Only append slug if provided
  if (category_slug && category_slug.trim() !== "") {
    url += `&category_slug=${category_slug}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch vendors");
  }

  return res.json();
}
