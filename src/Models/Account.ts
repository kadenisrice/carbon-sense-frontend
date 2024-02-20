// Make sure to update Context and backend if you decide to modify this

export default interface Account {
  _id?: string;
  uid: string;
  name?: string;
  displayName?: string;
  email: string;
  photoURL?: string;

  // Carbon Emissions
  totalCarbonEmission?: number;
  totalCarbonUnit?: string;
  activities?: Activity[];
}

interface Activity {
  uuid: string;
  name: string;

  // type of carbon is emmission type (electricity, vehicle, etc.)
  typeOfCarbon: string;
  carbon_g: number;
  carbon_lb: number;
  carbon_kg: number;
  carbon_mt: number;

  // for electricity
  electricityUnit?: string;
  electricityValue?: number;

  // for Flight
  passengers?: number;
  legs?: [];
  distanceUnit?: string;

  // for Shipping
  weightUnit: string;
  weightValue: number;
  distanceValue: number;
  transportMethod: string;

  // for more information
  country?: string;
  state?: string;
  estimatedDate?: string;
}
