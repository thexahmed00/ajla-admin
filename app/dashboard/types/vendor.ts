export type VendorStatus = "Active" | "Inactive";

export type Vendor = {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  status: VendorStatus;
  image: string;
};

