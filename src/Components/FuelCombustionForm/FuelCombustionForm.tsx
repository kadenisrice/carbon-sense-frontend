import "./FuelCombustionForm.css";

interface Props {
  fuelSourceType: string;
  setFuelSourceType: (type: string) => void;

  fuelSourceUnit: string;
  setFuelSourceUnit: (unit: string) => void;

  fuelSourceValue: number;
  setFuelSourceValue: (value: number) => void;
}

const FuelCombustionForm = ({
  fuelSourceType,
  setFuelSourceType,
  fuelSourceUnit,
  setFuelSourceUnit,
  fuelSourceValue,
  setFuelSourceValue,
}: Props) => {
  return (
    <div className="FuelCombustionForm">
      <div className="fuel-source-type">
        <label htmlFor="fuel-source-type">
          Select the type of fuel source being used:
        </label>
        <select
          name="fuel-source-type"
          id="fuel-source-type"
          value={fuelSourceType}
          onChange={(e) => {
            setFuelSourceType(e.target.value);
          }}
        >
          <option value="bit">Bituminous Coal</option>
          <option value="dfo">Home Heating and Diesel Fuel</option>
          <option value="jf">Jet Fuel</option>
          <option value="ker">Kerosene</option>
          <option value="lig">Lignite Coal</option>
          <option value="msw">Municipal Solid Waste</option>
          <option value="ng">Natural Gas</option>
          <option value="pc">Petroleum Coke</option>
          <option value="pg">Propane Gas</option>
          <option value="rfo">Residual Fuel Oil</option>
          <option value="sub">Subbituminous Coal</option>
          <option value="tdf">Tire-Derived Fuel</option>
          <option value="wo">Waste Oil</option>
        </select>
      </div>

      <div className="fuel-source-unit">
        <label htmlFor="fuel-source-unit">Chose the fuel source unit</label>
        <select
          name="fuel-source-unit"
          id="fuel-source-unit"
          value={fuelSourceUnit}
          onChange={(e) => {
            setFuelSourceUnit(e.target.value);
          }}
        >
          {/* bit, lig, msw, sub, tdf */}
          {fuelSourceType === "bit" && (
            <>
              <option value="short_ton">Short Ton</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "lig" && (
            <>
              <option value="short_ton">Short Ton</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "msw" && (
            <>
              <option value="short_ton">Short Ton</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "sub" && (
            <>
              <option value="short_ton">Short Ton</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "tdf" && (
            <>
              <option value="short_ton">Short Ton</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}

          {/* dfo, jf, ker, pc, pg, rfo */}
          {fuelSourceType === "dfo" && (
            <>
              <option value="gallon">Gallon</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "jf" && (
            <>
              <option value="gallon">Gallon</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "ker" && (
            <>
              <option value="gallon">Gallon</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "pc" && (
            <>
              <option value="gallon">Gallon</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "pg" && (
            <>
              <option value="gallon">Gallon</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "rfo" && (
            <>
              <option value="gallon">Gallon</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}

          {fuelSourceType === "ng" && (
            <>
              <option value="thousand_cubic_feet">Thousand Cubic Feet</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
          {fuelSourceType === "wo" && (
            <>
              <option value="barrel">Barrel</option>
              <option value="btu">British Thermal Unit</option>
            </>
          )}
        </select>
      </div>

      <div className="fuel-source-value">
        <label htmlFor="fuel-source-value">Fuel Source Value:</label>
        <input
          type="number"
          id="fuel-source-value"
          name="fuel-source-value"
          value={fuelSourceValue}
          onChange={(e) => {
            setFuelSourceValue(+e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default FuelCombustionForm;
