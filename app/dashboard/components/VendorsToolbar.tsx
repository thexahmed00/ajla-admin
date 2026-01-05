export default function VendorsToolbar() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      
      {/* Search */}
      <input
        type="text"
        placeholder="Search vendors..."
        className="w-full md:w-80 px-4 py-3 rounded-lg bg-[#1C1C1C] border border-[#2A2A2A] text-white placeholder-gray-500 outline-none"
      />

      {/* Category filter */}
      <select className="w-full md:w-56 px-4 py-3 rounded-lg bg-[#1C1C1C] border border-[#2A2A2A] text-white outline-none">
        <option>All Categories</option>
        <option>Hotels</option>
        <option>Private Jets</option>
        <option>Restaurants</option>
        <option>Yacht Charters</option>
        <option>Spa & Wellness</option>
      </select>
    </div>
  );
}
