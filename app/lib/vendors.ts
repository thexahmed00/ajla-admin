export async function fetchVendors() {
  const token = sessionStorage.getItem("token");

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
