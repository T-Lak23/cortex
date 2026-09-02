import "dotenv/config";
import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import { getCurrentUser } from "./controller/user.controller.js";
import { protect } from "./middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";
import morgan from "morgan";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api/chat", protect, proxyWithHeader(process.env.CHAT_SERVICE));
app.use("/api/agent", protect, proxyWithHeader(process.env.AGENT_SERVICE));
app.use("/api/billing", protect, proxyWithHeader(process.env.BILLING_SERVICE));
app.get("/api/me", protect, getCurrentUser);

app.get("/", (req, res) => {
  res.json({ message: "Hello from gateway" });
});

app.listen(PORT, () => {
  console.log("Gateway started on port", PORT);
});
