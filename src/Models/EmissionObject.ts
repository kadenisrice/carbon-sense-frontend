export default interface EmissionObject {
  id: string;
  attributes: Attribute;
}

interface Attribute {
  // will always have these:
  estimated_at: string;
  carbon_g: number;
  carbon_lb: number;
  carbon_kg: number;
  carbon_mt: number;

  // for electricity:
  electricity_unit?: string;
  electricity_value?: string;
  country?: string;
  state?: string;

  // for flight:

  // for shipping:
  distance_value?: string;
  distance_unit?: string;
  weight_value?: string;
  weight_unit?: string;
  transport_method?: string;
}
