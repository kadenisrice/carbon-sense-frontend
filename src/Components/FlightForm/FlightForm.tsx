import "./FlightForm.css";

const FlightForm = () => {
  return (
    <div className="FlightForm">
      <label htmlFor="passengers">How many passengers did you fly with?</label>
      <input type="number" id="passengers" name="passengers" />

      {/* you're gonna have to conditionally render the amount of "leg forms" needed based on how many people you flew with */}
    </div>
  );
};

export default FlightForm;
