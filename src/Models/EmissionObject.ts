export default interface EmissionObject {
  id: string;
  attributes: Attribute;
}

interface Attribute {
  country: string;
  state: string;
  electricity_unit: string;
  electricity_value: number;
  carbon_g: number;
  carbon_lb: number;
  carbon_kg: number;
  carbon_mt: number;
}
