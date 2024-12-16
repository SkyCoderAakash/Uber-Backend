import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import connectDB from "./db/connectDB.js";
connectDB();
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import captainRouter from "./routes/captainRouter.js";
import cookieParser from "cookie-parser";

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/captain", captainRouter);
app.get("/", (req, res) => {
  res.send("server is working fine");
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
