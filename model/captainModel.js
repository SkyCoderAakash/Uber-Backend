import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { requireMessgae } from "../constants.js";

const captainSchema = mongoose.Schema({
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
  },
  password: {
    type: String,
    required: [true, requireMessgae.Password_Required],
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: [true, requireMessgae.Vehicle_Color_Required],
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: [true, requireMessgae.Vehicle_Number_Plate_Required],
    },
    capacity: {
      type: Number,
      required: [true, requireMessgae.Vehicle_Capicity_Required],
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: [true, requireMessgae.Vehicle_Type_Required],
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECERET);
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModal = mongoose.model("captain", captainSchema);
export default captainModal;
