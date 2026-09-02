import express from "express";
import "dotenv/config";
import { connectDb } from "./config/db.js";
import { chatRouter } from "./routes/chat.route.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/", chatRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from chat" });
});

app.listen(PORT, () => {
  console.log("Chat started on port", PORT);
  connectDb();
});
