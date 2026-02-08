export type PlanTier = 'Lifestyle' | 'Traveller' | 'Elite';

export type Plan = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  tier: PlanTier;
  features: string[];
  is_active: boolean;
};
