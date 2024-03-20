import "./VehicleForm.css";

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

      <div className="vehicle-model-id"></div>
    </div>
  );
};

export default VehicleForm;
