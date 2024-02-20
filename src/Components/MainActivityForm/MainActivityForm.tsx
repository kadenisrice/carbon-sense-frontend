import { FormEvent, useContext, useEffect, useState } from "react";
import "./MainActivityForm.css";
import ElectricityForm from "../ElectricityForm/ElectricityForm";
import FlightForm from "../FlightForm/FlightForm";
import ShippingForm from "../ShippingForm/ShippingForm";
import VehicleForm from "../VehicleForm/VehicleForm";
import FuelCombustionForm from "../FuelCombustionForm/FuelCombustionForm";
import AuthContext from "../../context/AuthContext";
import Account from "../../Models/Account";
import { v4 as uuidv4 } from "uuid";
import {
  getCarbonEmission,
  getElectricityCarbonEmission,
} from "../../services/CarbonInterfaceAPI";
import EmissionObject from "../../Models/EmissionObject";

const MainActivityForm = () => {
  const { user, account, setAccount } = useContext(AuthContext);
  // this state here is to conditionally render each form based on the type of activity
  const [emissionType, setEmissionType] = useState("");

  // Activity form as a whole:
  const [activityName, setActivityName] = useState("");

  // for electricity form:
  const [electricityUnit, setElectricityUnit] = useState("mwh");
  const [electricityValue, setElectricityValue] = useState(0);
  const [electricityCountry, setElectricityCountry] = useState("");
  const [electricityState, setElectricityState] = useState("");

  // Once the response is returned from Carbon Interface API, this state variable will store that information:
  const [newEmissionInfo, setNewEmissionInfo] = useState<EmissionObject | null>(
    null
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (user && account) {
      const updatedAccount: Account = {
        ...account,
        activities: [
          ...account.activities,
          {
            uuid: uuidv4(),
            name: activityName,

            typeOfCarbon: emissionType,
          },
        ],
      };
    }
  };

  useEffect(() => {
    if (account && emissionType === "electricity") {
      getElectricityCarbonEmission({
        // these values are coming from the *electricity* part of the form below
        type: emissionType,
        electricity_unit: electricityUnit,
        electricity_value: electricityValue,
        country: electricityCountry,
        state: electricityState,
      }).then((res) => {
        if (res) {
          setNewEmissionInfo(res);
        }
      });
    } else {
      setNewEmissionInfo(null);
    }
  }, [account]);
  console.log(newEmissionInfo);

  return (
    <form className="MainActivityForm" onSubmit={handleSubmit}>
      <h3>Add a New Activity</h3>

      <div className="name-of-actiivity">
        <label htmlFor="activity-name">Name this activity:</label>
        <input
          type="text"
          id="activity-name"
          name="activity name"
          value={activityName}
          onChange={(e) => {
            setActivityName(e.target.value);
          }}
          required
        />
      </div>

      <div className="type-of-activity">
        <label htmlFor="type">
          What kind of activity are you taking part in?
        </label>
        <select
          onChange={(e) => {
            setEmissionType(e.target.value);
          }}
          name="type"
          id="type"
          value={emissionType}
          required
        >
          <option value="electricity">Electricity</option>
          <option value="flight">Flight</option>
          <option value="shipping">Shipping</option>
          <option value="vehicle">Vehicle</option>
          <option value="fuel-combustion">Fuel Combustion</option>
        </select>
      </div>
      {/* here we are setting the type of form based on which emission type the user chooses */}

      {emissionType === "electricity" && (
        <ElectricityForm
          electricityUnit={electricityUnit}
          setElectricityUnit={setElectricityUnit}
          electricityValue={electricityValue}
          setElectricityValue={setElectricityValue}
          electricityCountry={electricityCountry}
          setElectricityCountry={setElectricityCountry}
          electricityState={electricityState}
          setElectricityState={setElectricityState}
        />
      )}

      {emissionType === "flight" && <FlightForm />}

      {emissionType === "shipping" && <ShippingForm />}

      {emissionType === "vehicle" && <VehicleForm />}

      {emissionType === "fuel-combustion" && <FuelCombustionForm />}
    </form>
  );
};

export default MainActivityForm;
