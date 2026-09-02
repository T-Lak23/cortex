import { Router } from "express";
import { agent } from "../controllers/agent.controller.js";
import { multerInstance } from "../config/multer.js";

export const agentRouter = Router();

agentRouter.post("/chat", multerInstance.single("file"), agent);
