import Passenger from "../../Models/Passenger";
import "./LegForm.css";

interface Props {
  passenger: Passenger;

  departureAirport: string;
  setDepartureAirport: (s: string) => void;

  destinationAirport: string;
  setDestinationAirport: (s: string) => void;

  cabinClass: string;
  setCabinClass: (s: string) => void;
}

const LegForm = ({
  passenger,
  departureAirport,
  setDepartureAirport,
  destinationAirport,
  setDestinationAirport,
  cabinClass,
  setCabinClass,
}: Props) => {
  return (
    <div className="LegForm">
      <div className="departure-airport">
        <label htmlFor="departure-airport">
          {`What is ${passenger.name}'s departure airport?`}
        </label>
        <input
          type="text"
          id="departure-airport"
          name="departure-airport"
          value={departureAirport}
          onChange={(e) => {
            setDepartureAirport(e.target.value);
          }}
        />
      </div>
      <div className="destination-airport">
        <label htmlFor="destination-airport">
          {`What is ${passenger.name}'s destination airport?`}
        </label>
        <input
          type="text"
          id="destination-airport"
          name="destination-airport"
          value={destinationAirport}
          onChange={(e) => {
            setDestinationAirport(e.target.value);
          }}
        />
      </div>
      <div className="cabin-class">
        <label htmlFor="cabin-class">{`What is ${passenger.name}'s cabin class? (this is optional)`}</label>
        <select
          name="cabin-class"
          id="cabin-class"
          value={cabinClass}
          onChange={(e) => {
            setCabinClass(e.target.value);
          }}
        >
          <option value="economy">Economy</option>
          <option value="premium">Premium</option>
        </select>
      </div>
    </div>
  );
};

export default LegForm;
