import { Router } from "express";
import {
  deductCredit,
  login,
  logout,
  updateUserPayment,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/update-plan", updateUserPayment);
authRouter.post("/deduct-credits", deductCredit);
