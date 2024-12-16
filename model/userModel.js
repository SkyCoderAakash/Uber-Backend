import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { requireMessgae } from "../constants.js";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, requireMessgae.First_Name_Required],
  },
  lastName: {
    type: String,
    required: [true, requireMessgae.Last_Name_Required],
  },
  email: {
    type: String,
    required: [true, requireMessgae.Email_Required],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, requireMessgae.Password_Required],
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECERET);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
