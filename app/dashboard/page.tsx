import StatCard from "./components/StatCard";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl mb-1">Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Welcome to AJLA Admin Panel
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Conversations" value="156" />
        <StatCard title="Active Vendors" value="48" />
        <StatCard title="Service Categories" value="8" />
        <StatCard title="Availability" value="24/7" />
      </div>
    </>
  );
}
