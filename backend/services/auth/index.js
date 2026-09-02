import express from "express";
import "dotenv/config";
import { connectDb } from "./config/db.js";
import { authRouter } from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from auth" });
});

app.listen(PORT, () => {
  console.log("Auth started on port", PORT);
  connectDb();
});
