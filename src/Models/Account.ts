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

  // electricity, flight, shipping, vehicle, fuel combustion, etc etc..
  typeOfCarbon: string;
  typeUnit: string;
  typeAmt: string;
  carbon_g: number;
  carbon_lb: number;
  carbon_kg: number;
  carbon_mt: number;

  // for more information
  country?: string;
  state?: string;
  estimatedDate?: string;
}
