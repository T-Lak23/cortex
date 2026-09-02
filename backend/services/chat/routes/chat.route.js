import { Router } from "express";
import {
  createConversation,
  getConversation,
  getMessages,
  saveMessage,
  updateConversation,
} from "../controllers/chat.controller.js";

export const chatRouter = Router();

chatRouter.get("/create-conversation", createConversation);
chatRouter.get("/get-conversations", getConversation);
chatRouter.post("/update-conversation", updateConversation);
chatRouter.post("/save-message", saveMessage);
chatRouter.get("/get-messages/:conversationId", getMessages);
