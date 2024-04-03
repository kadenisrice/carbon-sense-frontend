export default interface VehicleMake {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      number_of_models: number;
    };
  };
}
