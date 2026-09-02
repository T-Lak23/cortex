import { api } from "../utils/axios";

export const sendMessage = async (paylaod) => {
  try {
    const { data } = await api.post("/api/agent/chat", paylaod);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
