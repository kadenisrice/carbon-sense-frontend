export default interface ShippingEmissionData {
  type: string;
  weight_unit: string;
  weight_value: number;
  distance_unit: string;
  distance_value: number;
  transport_method: string;
}
