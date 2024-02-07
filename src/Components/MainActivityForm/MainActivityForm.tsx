import { FormEvent, useState } from "react";
import "./MainActivityForm.css";
import ElectricityForm from "../ElectricityForm/ElectricityForm";
import FlightForm from "../FlightForm/FlightForm";
import ShippingForm from "../ShippingForm/ShippingForm";
import VehicleForm from "../VehicleForm/VehicleForm";
import FuelCombustionForm from "../FuelCombustionForm/FuelCombustionForm";

const MainActivityForm = () => {
  const [emissionType, setEmissionType] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="MainActivityForm" onSubmit={handleSubmit}>
      <label htmlFor="type">
        What kind of activity are you taking part in?
      </label>
      <select
        onChange={(e) => setEmissionType(e.target.value)}
        name="type"
        id="type"
      >
        <option value="electricity">Electricity</option>
        <option value="flight">Flight</option>
        <option value="shipping">Shipping</option>
        <option value="vehicle">Vehicle</option>
        <option value="fuel-combustion">Fuel Combustion</option>
      </select>

      {/* here we are setting the type of form based on which emission type the user chooses */}

      {emissionType === "electricity" && <ElectricityForm />}

      {emissionType === "flight" && <FlightForm />}

      {emissionType === "shipping" && <ShippingForm />}

      {emissionType === "vehicle" && <VehicleForm />}

      {emissionType === "fuel-combustion" && <FuelCombustionForm />}
    </form>
  );
};

export default MainActivityForm;
