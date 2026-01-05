export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl p-6">
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
