import "./ShippingForm.css";

interface Props {
  weightUnit: string;
  setWeightUnit: (unit: string) => void;

  weightValue: number;
  setWeightValue: (value: number) => void;

  distanceUnit: string;
  setDistanceUnit: (unit: string) => void;

  distanceValue: number;
  setDistanceValue: (value: number) => void;

  transportMethod: string;
  setTransportMethod: (method: string) => void;
}

const ShippingForm = ({
  weightUnit,
  setWeightUnit,
  weightValue,
  setWeightValue,
  distanceUnit,
  setDistanceUnit,
  distanceValue,
  setDistanceValue,
  transportMethod,
  setTransportMethod,
}: Props) => {
  return (
    <div className="ShippingForm">
      <div className="weight-value">
        <label htmlFor="weight-value">How heavy is your package?</label>
        <input
          type="number"
          id="weight-value"
          name="weight-vlaue"
          value={weightValue}
          onChange={(e) => {
            setWeightValue(+e.target.value);
          }}
        />
      </div>
      <div className="weight-unit">
        <label htmlFor="weight-unit">Weight Unit:</label>
        <select
          name="weight-unit"
          id="weight-unit"
          value={weightUnit}
          onChange={(e) => {
            setWeightUnit(e.target.value);
          }}
        >
          <option value="g">grams</option>
          <option value="lb">pounds</option>
          <option value="kg">kilograms</option>
          <option value="mt">tonnes</option>
        </select>
      </div>
      <div className="distance-value">
        <label htmlFor="distance-value">
          How far is this package traveling?
        </label>
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
      <div className="transport-method">
        <label htmlFor="transport-method">Transport Method:</label>
        <select
          name="transport-method"
          id="transport-method"
          value={transportMethod}
          onChange={(e) => {
            setTransportMethod(e.target.value);
          }}
        >
          <option value="ship">ship</option>
          <option value="train">train</option>
          <option value="truck">truck</option>
          <option value="plane">plane</option>
        </select>
      </div>

      <button>Add to Activity Log</button>
    </div>
  );
};

export default ShippingForm;
