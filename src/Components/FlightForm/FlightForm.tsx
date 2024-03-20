import { useEffect, useState } from "react";
import { Leg } from "../../Models/FlightEmissionData";
import Passenger from "../../Models/Passenger";
import LegForm from "../LegForm/LegForm";
import "./FlightForm.css";
import { v4 as uuidv4 } from "uuid";

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

  // --------------------------------------------------

  const getNumberOfPassengersArray = () => {
    let array = [];
    for (let index = 0; index < passengers; index++) {
      array.push({
        name: `passenger ${index + 1}`,
        uuid: uuidv4(),
      });
    }
    return array;
  };

  return (
    <div className="FlightForm">
      <div className="passengers">
        <label htmlFor="passengers">
          How many passengers did you fly with?
        </label>
        <input
          required
          type="number"
          id="passengers"
          name="passengers"
          value={passengers}
          min={0}
          onChange={(e) => {
            setPassengers(+e.target.value);
          }}
        />
      </div>

      <div className="distance-unit">
        <label htmlFor="distance-unit">
          What unit do you use for distance?
        </label>
        <select
          name="distance-unit"
          id="distance-unit"
          value={distanceUnit}
          onChange={(e) => {
            setDistanceUnit(e.target.value);
          }}
        >
          <option value="mi">Miles</option>
          <option value="km">Kilometers</option>
        </select>
      </div>

      {getNumberOfPassengersArray().map((passenger) => {
        return (
          <LegForm
            passenger={passenger}
            key={passenger.uuid}
            departureAirport={departureAirport}
            setDepartureAirport={setDepartureAirport}
            destinationAirport={destinationAirport}
            setDestinationAirport={setDestinationAirport}
            cabinClass={cabinClass}
            setCabinClass={setCabinClass}
          />
        );
      })}
    </div>
  );
};

export default FlightForm;
