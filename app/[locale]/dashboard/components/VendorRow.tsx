import ImageWithFallback from "./ImageWithFallback";
import { Vendor } from "../types/vendor";
import {
  Star,
  CheckCircle,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  Store
} from "lucide-react";
import Link from "next/link";

interface VendorRowProps {
  vendor: Vendor;
  index?: number;
  onDelete?: (id: number) => void;
}


export default function VendorRow({ vendor, index = 0, onDelete }: VendorRowProps) {


  const deleteVendor = async (vendorId: number) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://44.206.101.8/api/v1/admin/services/vendors/${vendorId}?hard_delete=false`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      console.log("Vendor deleted successfully");

      // Tell parent to remove vendor from UI
      onDelete?.(vendorId);

    } catch (error) {
      console.error("Error deleting vendor:", error);
      alert("Failed to delete vendor");
    }
  };

  const hideVendor = async (vendorId: number) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://44.206.101.8/api/v1/admin/services/vendors/${vendorId}?hard_delete=false`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      console.log("Vendor deleted successfully");



    } catch (error) {
      console.error("Error deleting vendor:", error);
      alert("Failed to delete vendor");
    }
  };






  // console.log("Rendering VendorRow for:", vendor);
  return (
//     <tr
//       className="hover:bg-surface-hover/50 transition-colors duration-200 group"
//       style={{
//         animation: 'fadeIn 0.4s ease-out forwards',
//         animationDelay: `${index * 0.05}s`,
//         opacity: 0
//       }}
//     >
//       {/* Vendor info */}
//       <td className="px-6 py-4">
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <ImageWithFallback
//               src={vendor.image}
//               alt={vendor.name}
//               className="w-11 h-11 rounded-lg object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
//               fallbackIcon={Store}
//             />
//           </div>

//           <div className="min-w-0">
//             <p className="font-medium text-text-main group-hover:text-primary transition-colors truncate max-w-[180px]">
//               {vendor.name}
//             </p>
//             <p className="text-xs text-text-muted truncate max-w-[180px]">
//               {vendor.description}
//             </p>
//           </div>
//         </div>
//       </td>

//       {/* Category */}
//       <td className="px-6 py-4">
//         <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/10">
//           {vendor.category}
//         </span>
//       </td>

//       {/* Rating */}
//       <td className="px-6 py-4">
//         <span className="inline-flex items-center gap-1.5 text-yellow-500">
//           <Star className="w-4 h-4 fill-yellow-500" />
//           <span className="text-text-main font-medium">{vendor.rating}</span>
//         </span>
//       </td>

//       {/* Status */}
//       <td className="px-6 py-4">
//         {vendor.status === "Active" ? (
//           <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/10 items-center gap-1.5">
//             <CheckCircle className="w-3.5 h-3.5" />
//             Active
//           </span>
//         ) : (
//           <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/10 items-center gap-1.5">
//             <XCircle className="w-3.5 h-3.5" />
//             Inactive
//           </span>
//         )}
//       </td>

//       {/* Actions */}
//       {/* <td className="px-6 py-4">
//         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//           <Link
//             href={`/dashboard/vendorinfo/${vendor?.id}`}
//             className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-200 cursor-pointer"
//             title="View"
//           >
//             <Eye className="w-4 h-4" />
//           </Link>

//           <Link
//             href={`vendors/addvendor/${vendor.id}`}
//             className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-200 cursor-pointer"
//             title="Edit"
//           // onClick={() => {
//           //   console.log("vendor selected vendor",vendor)
//           // }}
//           >
//             <Pencil className="w-4 h-4" />
//           </Link>

//           <button
//             className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/10 transition-all duration-200 cursor-pointer"
//             title="Delete"
//             onClick={() => deleteVendor(vendor.id)}
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </td> */}
//       <td className="px-6 py-4">
//   <div
//     className="
//       flex gap-2
//       opacity-100 md:opacity-0
//       md:group-hover:opacity-100
//       transition-opacity duration-200
//     "
//   >
//     <Link
//       href={`/dashboard/vendorinfo/${vendor?.id}`}
//       className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-200 cursor-pointer"
//       title="View"
//     >
//       <Eye className="w-4 h-4" />
//     </Link>

//     <Link
//       href={`vendors/addvendor/${vendor.id}`}
//       className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-200 cursor-pointer"
//       title="Edit"
//     >
//       <Pencil className="w-4 h-4" />
//     </Link>

//     <button
//       className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/10 transition-all duration-200 cursor-pointer"
//       title="Delete"
//       onClick={() => deleteVendor(vendor.id)}
//     >
//       <Trash2 className="w-4 h-4" />
//     </button>
//   </div>
// </td>

//     </tr>
<tr
  className="hover:bg-surface-hover/50 transition-colors duration-200 group"
  style={{
    animation: "fadeIn 0.4s ease-out forwards",
    animationDelay: `${index * 0.05}s`,
    opacity: 0,
  }}
>
  {/* Vendor info (ALWAYS visible) */}
  <td className="px-4 md:px-6 py-4">
    <div className="flex items-center gap-3 md:gap-4">
      <ImageWithFallback
        src={vendor.image}
        alt={vendor.name}
        className="w-10 h-10 md:w-11 md:h-11 rounded-lg object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
        fallbackIcon={Store}
      />

      <div className="min-w-0">
        <p className="font-medium text-text-main truncate max-w-[140px] md:max-w-[180px]">
          {vendor.name}
        </p>
        <p className="text-xs text-text-muted truncate max-w-[140px] md:max-w-[180px]">
          {vendor.description}
        </p>

        {/* Mobile-only Category */}
        <span className="md:hidden inline-block mt-1 text-xs text-primary">
          {vendor.category}
        </span>
      </div>
    </div>
  </td>

  {/* Category (tablet+) */}
  <td className="hidden md:table-cell px-6 py-4">
    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/10">
      {vendor.category}
    </span>
  </td>

  {/* Rating (desktop only) */}
  <td className="hidden lg:table-cell px-6 py-4">
    <span className="inline-flex items-center gap-1.5 text-yellow-500">
      <Star className="w-4 h-4 fill-yellow-500" />
      <span className="text-text-main font-medium">{vendor.rating}</span>
    </span>
  </td>

  {/* Status (ALWAYS visible) */}
  <td className="px-4 md:px-6 py-4">
    {vendor.status === "Active" ? (
      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/10 items-center gap-1">
        <CheckCircle className="w-3.5 h-3.5" />
        Active
      </span>
    ) : (
      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/10 items-center gap-1">
        <XCircle className="w-3.5 h-3.5" />
        Inactive
      </span>
    )}
  </td>

  {/* Actions (always visible, hover only on desktop) */}
  <td className="px-4 md:px-6 py-4 align-middle">
  <div
    className="
      flex items-center gap-2
      justify-end
      min-w-[96px]

      md:opacity-0
      md:group-hover:opacity-100
      transition-opacity duration-200
    "
  >
    <Link
      href={`/dashboard/vendorinfo/${vendor.id}`}
      className="action-btn"
      title="View"
    >
      <Eye className="w-4 h-4" />
    </Link>

    <Link
      href={`vendors/addvendor/${vendor.id}`}
      className="action-btn"
      title="Edit"
    >
      <Pencil className="w-4 h-4" />
    </Link>

    <button
      className="action-btn-danger"
      title="Delete"
      onClick={() => deleteVendor(vendor.id)}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
</td>

</tr>

  );
}
