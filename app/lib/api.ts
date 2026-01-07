export async function fetchDashboardStats() {
  const token = sessionStorage.getItem("token");

  const res = await fetch("/api/dashboard/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
}
