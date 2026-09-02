import express from "express";
import "dotenv/config";
import { connectDb } from "./config/db.js";
import { billingRouter } from "./routes/billing.route.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/", billingRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from billing" });
});

app.listen(PORT, () => {
  console.log("Billing started on port", PORT);
  connectDb();
});
