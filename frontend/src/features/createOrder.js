import { api } from "../utils/axios";

export const createOrder = async (payload) => {
  try {
    const { data } = await api.post("/api/billing/create", { plan: payload });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
