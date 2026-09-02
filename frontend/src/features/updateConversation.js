import { api } from "../utils/axios";

export const updateConversation = async (paylaod) => {
  try {
    const { data } = await api.post("/api/chat/update-conversation", paylaod);
    return data;
  } catch (error) {
    console.log(data);
    return [];
  }
};
