import axios from "axios";
import EmissionObject from "../Models/EmissionObject";

const carbonInterfaceApiKey: string =
  import.meta.env.VITE_CARBON_API_KEY ?? "API key is not present!";

const baseUrl: string = import.meta.env.VITE_CARBON_BASE_URL ?? "not found";

// Get Carbon Emissions:

export const getCarbonEmission = async (
  data: EmissionObject
): Promise<EmissionObject | void> => {
  try {
    return (
      await axios.post(`${baseUrl}`, data, {
        headers: { Authorization: carbonInterfaceApiKey },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};
