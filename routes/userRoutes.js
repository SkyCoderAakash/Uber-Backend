import express from "express";
import {
  register,
  login,
  profile,
  logout,
} from "../controllers/userController.js";
import { userAuth } from "../middleware/userAuth.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", userAuth, profile);
userRouter.get("/logout", logout);

export default userRouter;
