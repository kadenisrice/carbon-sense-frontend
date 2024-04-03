export default interface VehicleModel {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      year: number;
      vehicle_make: string;
    };
  };
}
