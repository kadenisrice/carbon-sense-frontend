export default interface FlightEmissionData {
  type: string;
  passengers: number;
  legs: Leg[];
}

interface Leg {
  departure_airport: string;
  destination_airport: string;
  cabin_class?: string;
}
