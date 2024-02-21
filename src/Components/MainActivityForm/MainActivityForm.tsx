import { FormEvent, useContext, useEffect, useState } from "react";
import "./MainActivityForm.css";
import ElectricityForm from "../ElectricityForm/ElectricityForm";
import FlightForm from "../FlightForm/FlightForm";
import ShippingForm from "../ShippingForm/ShippingForm";
import VehicleForm from "../VehicleForm/VehicleForm";
import FuelCombustionForm from "../FuelCombustionForm/FuelCombustionForm";
import AuthContext from "../../context/AuthContext";
import Account, { Activity } from "../../Models/Account";
import { v4 as uuidv4 } from "uuid";
import {
  getElectricityCarbonEmission,
  getFlightCarbonEmission,
  getShippingCarbonEmission,
} from "../../services/CarbonInterfaceAPI";
import EmissionObject from "../../Models/EmissionObject";
import { updateAccountById } from "../../services/AccountAPI";

const MainActivityForm = () => {
  const { user, account, setAccount } = useContext(AuthContext);
  // this state here is to conditionally render each form based on the type of activity
  const [emissionType, setEmissionType] = useState("");

  // Activity form as a whole:
  const [activityName, setActivityName] = useState("");

  // ------------------------------------------------------------------------------------------------------------------------------

  // for electricity form: -------------------------------------------------------------
  const [electricityUnit, setElectricityUnit] = useState("mwh");
  const [electricityValue, setElectricityValue] = useState(0);
  const [electricityCountry, setElectricityCountry] = useState("");
  const [electricityState, setElectricityState] = useState("");

  // for flight form: -------------------------------------------------------------
  const [passengers, setPassengers] = useState(0);
  const [legs, setLegs] = useState([]);

  //distance unit is also used for the shipping/vehicle form as well
  const [distanceUnit, setDistanceUnit] = useState("km");

  // for leg object/array
  const [departureAirport, setDepartureAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");
  const [cabinClass, setCabinClass] = useState("economy");

  // for shipping form: -------------------------------------------------------------
  const [weightUnit, setWeightUnit] = useState("kg");
  const [weightValue, setWeightValue] = useState(0);

  // distance value is also used for vehicle form
  const [distanceValue, setDistanceValue] = useState(0);
  const [transportMethod, setTransportMethod] = useState("");

  // for vehicle form: -------------------------------------------------------------
  const [vehicleModelId, setVehicleModelId] = useState("");

  // ------------------------------------------------------------------------------------------------------------------------------

  // Once the response is returned from Carbon Interface API, this state variable will store that information:
  const [newEmissionInfo, setNewEmissionInfo] = useState<EmissionObject | null>(
    null
  );

  // functions below now ------------------------------------------------------------------------------------------------------------

  const addToDatabase = () => {
    if (user && account) {
      let myActivities: Activity[] = [];

      if (account.activities) {
        myActivities = [
          ...account.activities,
          {
            uuid: uuidv4(),

            // this is the main form info
            name: activityName,
            typeOfCarbon: emissionType,

            // new emission info is the response from the Carbon API (flight, electricity, fuel combustion, etc.)
            ...newEmissionInfo,
          },
        ];
      }

      const updatedAccount: Account = account;
      updatedAccount.activities = myActivities;

      updateAccountById(account._id!, updatedAccount);

      // const updatedAccount: Account = {
      //   ...account,
      //   activities: [...account.activities],
      // };
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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
    } else if (account && emissionType === "flight") {
    } else if (account && emissionType === "shipping") {
      getShippingCarbonEmission({
        type: emissionType,
        weight_unit: weightUnit,
        weight_value: weightValue,
        distance_unit: distanceUnit,
        distance_value: distanceValue,
        transport_method: transportMethod,
      }).then((res) => {
        if (res) {
          setNewEmissionInfo(res);
        }
      });
    } else if (account && emissionType === "vehicle") {
    } else if (account && emissionType === "fuel-combustion") {
    } else {
      setNewEmissionInfo(null);
    }

    // resetting fields:

    // electricity:
    setEmissionType("");
    setElectricityUnit("");
    setElectricityValue(0);
    setElectricityCountry("");
    setElectricityState("");
  };

  // console.log(electricityUnit);
  // console.log(weightUnit);
  // console.log(weightValue);
  // console.log(distanceUnit);
  // console.log(distanceValue);
  // console.log(transportMethod);

  useEffect(() => {}, [account]);
  console.log(newEmissionInfo);
  // below is JSX --------------------------------------------------------------------------------------------------

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

      {emissionType === "shipping" && (
        <ShippingForm
          weightUnit={weightUnit}
          setWeightUnit={setWeightUnit}
          weightValue={weightValue}
          setWeightValue={setWeightValue}
          distanceUnit={distanceUnit}
          setDistanceUnit={setDistanceUnit}
          distanceValue={distanceValue}
          setDistanceValue={setDistanceValue}
          transportMethod={transportMethod}
          setTransportMethod={setTransportMethod}
        />
      )}

      {emissionType === "vehicle" && <VehicleForm />}

      {emissionType === "fuel-combustion" && <FuelCombustionForm />}

      <button type="submit">load carbon API call</button>
      <button onClick={addToDatabase}>add activity to database</button>
    </form>
  );
};

export default MainActivityForm;
