import { useEffect, useState } from "react";
import "./VehicleForm.css";
import {
  getVehicleMakes,
  getVehicleModels,
} from "../../services/CarbonInterfaceAPI";
import VehicleMake from "../../Models/VehicleMake";
import VehicleModel from "../../Models/VehicleModel";

interface Props {
  distanceUnit: string;
  setDistanceUnit: (unit: string) => void;
  distanceValue: number;
  setDistanceValue: (value: number) => void;
  vehicleModelId: string;
  setVehicleModelId: (id: string) => void;
}

const VehicleForm = ({
  distanceUnit,
  setDistanceUnit,
  distanceValue,
  setDistanceValue,
  vehicleModelId,
  setVehicleModelId,
}: Props) => {
  // vehicleMakes takes the API call and stores the res in this state variable:
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);

  // this is the state that holds the array of models based on the selected vehicle make:
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);

  useEffect(() => {
    getVehicleMakes().then((res) => {
      if (res) {
        setVehicleMakes(res);
      }
    });
  }, []);

  const makeChangeHandler = (e: any) => {
    console.log(e);

    // fiding the make that matches the selected make by user:
    const make = vehicleMakes.find(
      (vehicleMake) => vehicleMake.data.id === e.target.value
    );

    console.log(make);
    console.log(e.target.value);

    // get request of the models based on selected make:
    getVehicleModels(make?.data.id || "").then((res) => {
      if (res) {
        setVehicleModels(res);
      }
    });
  };

  // console.log(vehicleModels);
  // console.log(vehicleModelId);

  // We need to conditionally render a select form element with options based on the users selected make of vehicle.

  return (
    <div className="VehicleForm">
      <div className="distance-value">
        <label htmlFor="distance-value">How far was your trip?</label>
        <input
          type="number"
          id="distance-value"
          name="distance-value"
          value={distanceValue}
          onChange={(e) => {
            setDistanceValue(+e.target.value);
          }}
        />
      </div>
      <div className="distance-unit">
        <label htmlFor="distance-unit">Distance Unit:</label>
        <select
          name="distance-unit"
          id="distance-unit"
          value={distanceUnit}
          onChange={(e) => {
            setDistanceUnit(e.target.value);
          }}
        >
          <option value="mi">miles</option>
          <option value="km">kilometers</option>
        </select>
      </div>
      <div className="vehicle-make">
        <select
          name="vehicle-make"
          id="vehicle-make"
          onChange={makeChangeHandler}
        >
          {vehicleMakes.map((vehicleMake) => (
            <option key={vehicleMake.data.id} value={vehicleMake.data.id}>
              Vehicle Name: {vehicleMake.data.attributes.name}
            </option>
          ))}
        </select>
      </div>

      <div className="vehicle-model">
        <select
          name="vehicle-model"
          id="vehicle-model"
          value={vehicleModelId}
          onChange={(e) => {
            setVehicleModelId(e.target.value);
          }}
        >
          {vehicleModels.map((vehicleModel) => (
            <option value={vehicleModel.data.id} key={vehicleModel.data.id}>
              {`${vehicleModel.data.attributes.name} ${vehicleModel.data.attributes.vehicle_make} ${vehicleModel.data.attributes.year}`}
            </option>
          ))}
        </select>
      </div>

      <div className="vehicle-model-id"></div>
    </div>
  );
};

export default VehicleForm;
