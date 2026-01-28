export type Plan = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  tier: number;
  features: string[];
  is_active: boolean;
};
