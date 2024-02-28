import { useEffect, useState } from "react";
import { Leg } from "../../Models/FlightEmissionData";
import Passenger from "../../Models/Passenger";
import LegForm from "../LegForm/LegForm";
import "./FlightForm.css";

interface Props {
  passengers: number;
  setPassengers: (p: number) => void;

  legs: Leg[];
  setLegs: (legs: []) => void;

  distanceUnit: string;
  setDistanceUnit: (unit: string) => void;

  departureAirport: string;
  setDepartureAirport: (s: string) => void;

  destinationAirport: string;
  setDestinationAirport: (s: string) => void;

  cabinClass: string;
  setCabinClass: (s: string) => void;
}

const FlightForm = ({
  passengers,
  setPassengers,
  legs,
  setLegs,
  distanceUnit,
  setDistanceUnit,
  departureAirport,
  setDepartureAirport,
  destinationAirport,
  setDestinationAirport,
  cabinClass,
  setCabinClass,
}: Props) => {
  // state variables:

  const [passengersArrayState, setPassengersArrayState] = useState<
    Passenger[] | null
  >([]);

  // --------------------------------------------------

  const getNumberOfPassengersArray = () => {
    for (let index = 0; index < passengers; index++) {
      if (passengersArrayState) {
        if (index + 1 === passengers) {
          passengersArrayState.push({
            name: `Passenger ${index + 1}`,
          });
        }
      }
    }
  };

  useEffect(() => {
    getNumberOfPassengersArray();
  }, [passengers]);

  console.log(passengers);
  console.log(passengersArrayState);

  return (
    <div className="FlightForm">
      <div className="passengers">
        <label htmlFor="passengers">
          How many passengers did you fly with?
        </label>
        <input
          type="number"
          id="passengers"
          name="passengers"
          value={passengers}
          onChange={(e) => {
            setPassengers(+e.target.value);
          }}
        />
      </div>

      {passengersArrayState!.map((passenger) => {
        return <LegForm passenger={passenger} key={passenger.name} />;
      })}
    </div>
  );
};

export default FlightForm;
