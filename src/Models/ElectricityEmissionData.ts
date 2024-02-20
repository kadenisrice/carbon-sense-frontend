export default interface ElectricityEmissionData {
  type: string;
  electricity_unit?: string;
  electricity_value: number;
  country: string;
  state?: string;
}
