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
        <p>Choose the unit of electricity:</p>
        <label htmlFor="mwh">Megawatt Hours</label>
        <input
          type="radio"
          id="mwh"
          name="megawatt hours"
          onChange={(e) => setElectricityUnit(e.target.value)}
          value={electricityUnit}
        />
        <label htmlFor="kwh">Kilowatt Hours</label>
        <input
          type="radio"
          id="kwh"
          name="kilowatt hours"
          onChange={(e) => setElectricityUnit(e.target.value)}
          value={electricityUnit}
        />
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
