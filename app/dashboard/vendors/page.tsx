import VendorsToolbar from "../components/VendorsToolbar";
import VendorsTable from "../components/VendorsTable";
import Link from "next/link";

export default function VendorsPage() {
  return (
    <div className="space-y-6 overflow-x-hidden">
      
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl mb-1">
            Vendors
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Manage restaurants, hotels, jets, and more
          </p>
        </div>

        <Link
          href="vendors/addvendor"
          className="inline-flex items-center justify-center w-full md:w-auto px-5 py-3 md:py-2 rounded-lg bg-[#FF7F41] text-black font-medium hover:opacity-90"
        >
          + Add Vendor
        </Link>
      </div>

      {/* Toolbar */}
      <VendorsToolbar />

      {/* Table */}
      <VendorsTable />

    </div>
  );
}
