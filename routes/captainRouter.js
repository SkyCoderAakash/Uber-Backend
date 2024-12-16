import express from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/captainController.js";
import { captainAuth } from "../middleware/captainAuth.js";
const captainRouter = express.Router();

captainRouter.post("/register", register);
captainRouter.post("/login", login);
captainRouter.get("/profile", captainAuth, profile);
captainRouter.get("/logout", logout);

export default captainRouter;
