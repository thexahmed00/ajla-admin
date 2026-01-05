import VendorsToolbar from "../components/VendorsToolbar";
import VendorsTable from "../components/VendorsTable";

export default function VendorsPage() {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl mb-1">Vendors</h1>
          <p className="text-gray-400">
            Manage restaurants, hotels, jets, and more
          </p>
        </div>

        <button className="px-5 py-2 rounded-lg bg-[#FF7F41] text-black font-medium hover:opacity-90">
          + Add Vendor
        </button>
      </div>

      {/* Toolbar */}
      <VendorsToolbar />

      {/* Table */}
      <VendorsTable />
    </>
  );
}
