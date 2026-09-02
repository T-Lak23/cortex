import express from "express";
import "dotenv/config";
import { connectDb } from "./config/db.js";
import { agentRouter } from "./routes/agent.route.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/", agentRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from chat" });
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    return res.status(err.status).json(err.data);
  }
  return res.status(500).json({ message: `Agent error ${err}` });
});

app.listen(PORT, () => {
  console.log("Agent started on port", PORT);
  connectDb();
});
