export async function fetchVendors() {
  const token = localStorage.getItem("access_token");

  const res = await fetch("/api/vendors", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch vendors");
  }

  return res.json();
}
