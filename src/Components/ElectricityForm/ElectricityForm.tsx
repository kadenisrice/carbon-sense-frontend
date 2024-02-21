import "./ElectricityForm.css";

interface Props {
  electricityUnit: string;
  setElectricityUnit: (unit: string) => void;

  electricityValue: number;
  setElectricityValue: (value: number) => void;

  electricityCountry: string;
  setElectricityCountry: (country: string) => void;

  electricityState: string;
  setElectricityState: (state: string) => void;
}

const ElectricityForm = ({
  electricityUnit,
  setElectricityUnit,
  electricityValue,
  setElectricityValue,
  electricityCountry,
  setElectricityCountry,
  electricityState,
  setElectricityState,
}: Props) => {
  return (
    <div className="ElectricityForm">
      <div className="unit-of-electricity">
        <label htmlFor="electricity-unit">Choose unit of electricity</label>
        <select
          name="electricity-uniit"
          id="electricity-unit"
          value={electricityUnit}
          onChange={(e) => {
            setElectricityUnit(e.target.value);
          }}
        >
          <option value="mwh">megawatt hours</option>
          <option value="kwh">kilowatt hours</option>
        </select>
      </div>

      <div className="value-of-electricity">
        <label htmlFor="elec-value">
          enter the amount of Megawatts used per hour:
        </label>
        <input
          type="number"
          id="elec-value"
          name="electricity-value"
          onChange={(e) => setElectricityValue(+e.target.value)}
          value={electricityValue}
        />
      </div>

      <div className="country-select">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          onChange={(e) => setElectricityCountry(e.target.value)}
          value={electricityCountry}
        />
      </div>

      <div className="state-select">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          onChange={(e) => setElectricityState(e.target.value)}
          value={electricityState}
        />
      </div>

      <button>Add to Activity Log</button>
    </div>
  );
};

export default ElectricityForm;
