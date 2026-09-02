import { Router } from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/billing.controllers.js";

export const billingRouter = Router();

billingRouter.post("/create", createOrder);
billingRouter.post("/verify", verifyPayment);
