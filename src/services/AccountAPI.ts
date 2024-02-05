import axios from "axios";
import Account from "../Models/Account";

const baseUrl: string = import.meta.env.VITE_API_URL ?? "NOT FOUND";

// get account by ID:
export const getAccountById = async (uid: string): Promise<Account | void> => {
  try {
    return (await axios.get(`${baseUrl}/accounts/${encodeURIComponent(uid)}`))
      .data;
  } catch (err) {
    console.log(err);
  }
};

// Create new account:
export const createNewAccount = async (account: Account): Promise<Account> => {
  return (await axios.post(`${baseUrl}/accounts`, account)).data;
};
