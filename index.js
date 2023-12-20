/** @format */

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

import userRouter from "./routes/userRoutes.js";

app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
