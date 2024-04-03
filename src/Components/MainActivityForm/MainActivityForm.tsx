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
  getFuelCombustionCarbonEmission,
  getShippingCarbonEmission,
  getVehicleCarbonEmission,
  getVehicleMakes,
} from "../../services/CarbonInterfaceAPI";
import EmissionObject from "../../Models/EmissionObject";
import { updateAccountById } from "../../services/AccountAPI";
import VehicleMake from "../../Models/VehicleMake";

const MainActivityForm = () => {
  const { user, account, setAccount } = useContext(AuthContext);
  // this state here is to conditionally render each form based on the type of activity
  const [emissionType, setEmissionType] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

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

  // for fuel combustion form: -------------------------------------------------------------
  const [fuelSourceType, setFuelSourceType] = useState("");
  const [fuelSourceUnit, setFuelSourceUnit] = useState("");
  const [fuelSourceValue, setFuelSourceValue] = useState(0);

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
      getFlightCarbonEmission({
        type: emissionType,
        passengers: passengers,
        distance_unit: distanceUnit,
        legs: [
          {
            departure_airport: departureAirport,
            destination_airport: destinationAirport,
            cabin_class: cabinClass,
          },
        ],
      }).then((res) => {
        if (res) {
          setNewEmissionInfo(res);
        }
      });
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
      getVehicleCarbonEmission({
        type: emissionType,
        distance_unit: distanceUnit,
        distance_value: distanceValue,
        vehicle_model_id: vehicleModelId,
      }).then((res) => {
        if (res) {
          setNewEmissionInfo(res);
        }
      });
    } else if (account && emissionType === "fuel_combustion") {
      getFuelCombustionCarbonEmission({
        type: emissionType,
        fuel_source_type: fuelSourceType,
        fuel_source_unit: fuelSourceUnit,
        fuel_source_value: fuelSourceValue,
      }).then((res) => {
        if (res) {
          setNewEmissionInfo(res);
        }
      });
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

    // flight:
    setPassengers(0);
    setDepartureAirport("");
    setDestinationAirport("");
    setCabinClass("economy");
    setDistanceUnit("km");

    // shipping:
    setWeightUnit("kg");
    setWeightValue(0);
    setDistanceValue(0);
    setTransportMethod("ship");
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

      <div className="name-of-activity">
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
        <div
          className={`electricity type-icon ${
            selectedTab === 0
              ? `selected ${useEffect(() => {
                  setEmissionType("electricity");
                }, [selectedTab])}`
              : ""
          }`}
          onClick={() => {
            setSelectedTab(0);
          }}
        >
          <i className="fa-solid fa-bolt"></i>
        </div>
        <div
          className={`flight type-icon ${
            selectedTab === 1
              ? `selected ${useEffect(() => {
                  setEmissionType("flight");
                }, [selectedTab])}`
              : ""
          }`}
          onClick={() => {
            setSelectedTab(1);
          }}
        >
          <i className="fa-solid fa-plane"></i>
        </div>
        <div
          className={`shipping type-icon ${
            selectedTab === 2
              ? `selected ${useEffect(() => {
                  setEmissionType("shipping");
                }, [selectedTab])}`
              : ""
          }`}
          onClick={() => {
            setSelectedTab(2);
          }}
        >
          <i className="fa-solid fa-truck-fast"></i>
        </div>
        <div
          className={`vehicle type-icon ${
            selectedTab === 3
              ? `selected ${useEffect(() => {
                  setEmissionType("vehicle");
                }, [selectedTab])}`
              : ""
          }`}
          onClick={() => {
            setSelectedTab(3);
          }}
        >
          <i className="fa-solid fa-car"></i>
        </div>
        <div
          className={`fuel_combustion type-icon ${
            selectedTab === 4
              ? `selected ${useEffect(() => {
                  setEmissionType("fuel_combustion");
                }, [selectedTab])}`
              : ""
          }`}
          onClick={() => {
            setSelectedTab(4);
          }}
        >
          <i className="fa-solid fa-gas-pump"></i>
        </div>
      </div>

      <h3>{emissionType === "electricity" ? "Electricity" : ""}</h3>
      <h3>{emissionType === "flight" ? "Flight" : ""}</h3>
      <h3>{emissionType === "shipping" ? "Shipping" : ""}</h3>
      <h3>{emissionType === "vehicle" ? "Vehicle" : ""}</h3>
      <h3>{emissionType === "fuel_combustion" ? "Fuel Combustion" : ""}</h3>

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

      {emissionType === "flight" && (
        <FlightForm
          passengers={passengers}
          setPassengers={setPassengers}
          legs={legs}
          setLegs={setLegs}
          distanceUnit={distanceUnit}
          setDistanceUnit={setDistanceUnit}
          departureAirport={departureAirport}
          setDepartureAirport={setDepartureAirport}
          destinationAirport={destinationAirport}
          setDestinationAirport={setDestinationAirport}
          cabinClass={cabinClass}
          setCabinClass={setCabinClass}
        />
      )}

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

      {emissionType === "vehicle" && (
        <VehicleForm
          distanceUnit={distanceUnit}
          setDistanceUnit={setDistanceUnit}
          distanceValue={distanceValue}
          setDistanceValue={setDistanceValue}
          vehicleModelId={vehicleModelId}
          setVehicleModelId={setVehicleModelId}
        />
      )}

      {emissionType === "fuel_combustion" && (
        <FuelCombustionForm
          fuelSourceType={fuelSourceType}
          setFuelSourceType={setFuelSourceType}
          fuelSourceUnit={fuelSourceUnit}
          setFuelSourceUnit={setFuelSourceUnit}
          fuelSourceValue={fuelSourceValue}
          setFuelSourceValue={setFuelSourceValue}
        />
      )}

      <button type="submit">load carbon API call</button>
      <button onClick={addToDatabase}>add activity to database</button>
    </form>
  );
};

export default MainActivityForm;
