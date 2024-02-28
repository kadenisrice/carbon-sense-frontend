import axios from "axios";
import EmissionObject from "../Models/EmissionObject";
import ElectricityEmissionData from "../Models/ElectricityEmissionData";
import FlightEmissionData from "../Models/FlightEmissionData";
import ShippingEmissionData from "../Models/ShippingEmissionData";
import VehicleEmissionData from "../Models/VehicleEmissionData";
import FuelCombustionEmissionData from "../Models/FuelCombustionEmissionData";

const carbonInterfaceApiKey: string =
  import.meta.env.VITE_CARBON_API_KEY ?? "API key is not present!";

const baseUrl: string = import.meta.env.VITE_CARBON_BASE_URL ?? "not found";

// Get Carbon Emissions (electricity):
export const getElectricityCarbonEmission = async (
  data: ElectricityEmissionData
): Promise<EmissionObject | void> => {
  try {
    return (
      await axios.post(`${baseUrl}`, data, {
        headers: { Authorization: carbonInterfaceApiKey },
      })
    ).data.data.attributes;
  } catch (err) {
    console.log(err);
  }
};

// Get Carbon Emissions (flight):
export const getFlightCarbonEmission = async (
  data: FlightEmissionData
): Promise<EmissionObject | void> => {
  try {
    return (
      await axios.post(`${baseUrl}`, data, {
        headers: { Authorization: carbonInterfaceApiKey },
      })
    ).data.data.attributes;
  } catch (err) {
    console.log(err);
  }
};

// Get Carbon Emissions (shipping):
export const getShippingCarbonEmission = async (
  data: ShippingEmissionData
): Promise<EmissionObject | void> => {
  try {
    return (
      await axios.post(`${baseUrl}`, data, {
        headers: { Authorization: carbonInterfaceApiKey },
      })
    ).data.data.attributes;
  } catch (err) {
    console.log(err);
  }
};

// Get Carbon Emissions (vehiicle):
export const getVehicleCarbonEmission = async (
  data: VehicleEmissionData
): Promise<EmissionObject | void> => {
  try {
    return (
      await axios.post(`${baseUrl}`, data, {
        headers: { Authorization: carbonInterfaceApiKey },
      })
    ).data.data.attributes;
  } catch (err) {
    console.log(err);
  }
};

// Get Carbon Emissions (fuel combustion):
export const getFuelCombustionCarbonEmission = async (
  data: FuelCombustionEmissionData
): Promise<EmissionObject | void> => {
  try {
    return (
      await axios.post(`${baseUrl}`, data, {
        headers: { Authorization: carbonInterfaceApiKey },
      })
    ).data.data.attributes;
  } catch (err) {
    console.log(err);
  }
};
