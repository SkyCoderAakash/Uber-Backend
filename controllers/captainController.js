import { errorMessages, successMessages } from "../constants.js";
import captainModal from "../model/captainModel.js";
import CreateResponse from "../utils/CreateResponce.js";

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, vehicle } = req.body;
    const { color, capacity, plate, vehicleType } = vehicle;
    if (!firstName || !lastName || !email || !password || !vehicle) {
      return res.status(400).json(
        CreateResponse({
          success: false,
          message: errorMessages.PLEASE_FILL_MANDATORY_FILEDS,
          statusCode: 400,
        })
      );
    }
    const existingCaptain = await captainModal.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json(
        CreateResponse({
          success: false,
          message: errorMessages.CAPTAIN_ALREADY_EXISTS,
          statusCode: 400,
        })
      );
    }
    const hashPassword = await captainModal.hashPassword(password);
    const captain = new captainModal({
      firstName,
      lastName,
      email,
      password: hashPassword,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });
    await captain.save();
    const token = captain.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: process.env.TOKEN_EXPIRY * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(
      CreateResponse({
        message: successMessages.CAPTAIN_REGISTERED_SUCCESSFULLY,
        data: {
          captain,
          token,
        },
        statusCode: 201,
      })
    );
  } catch (error) {
    console.error("Error in captain registration:", error.message);
    return res.status(500).json(
      CreateResponse({
        success: false,
        message: error.message,
        statusCode: 500,
      })
    );
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(
        CreateResponse({
          success: false,
          message: errorMessages.PLEASE_FILL_MANDATORY_FILEDS,
          statusCode: 400,
        })
      );
    }

    const captain = await captainModal.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(400).json(
        CreateResponse({
          success: false,
          message: errorMessages.INVALID_EMAIL_OR_PASSWORD,
          statusCode: 400,
        })
      );
    }
    const isPasswordMatched = await captain.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json(
        CreateResponse({
          success: false,
          message: errorMessages.INVALID_EMAIL_OR_PASSWORD,
          statusCode: 400,
        })
      );
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: process.env.TOKEN_EXPIRY * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(
      CreateResponse({
        message: successMessages.CAPTAIN_LOGGED_IN_SUCCESSFULLY,
        data: {
          captain,
          token,
        },
        statusCode: 200,
      })
    );
  } catch (error) {
    console.error("Error in caprain login:", error.message);
    return res.status(500).json(
      CreateResponse({
        success: false,
        message: error.message,
        statusCode: 500,
      })
    );
  }
};
const profile = async (req, res) => {
  try {
    const { _id } = req?.captain;
    const captain = await captainModal.findOne({ _id });

    if (!captain) {
      return res.status(404).json(
        CreateResponse({
          success: false,
          message: errorMessages.CAPTAIN_NOT_FOUND,
          statusCode: 404,
        })
      );
    }

    return res.status(200).json(
      CreateResponse({
        success: true,
        message: successMessages.CAPTAIN_PROFILE_GET_SUCCESSFULLY,
        data: captain,
        statusCode: 200,
      })
    );
  } catch (error) {
    console.error("Error in captain profile:", error.message);
    return res.status(500).json(
      CreateResponse({
        success: false,
        message: error.message,
        statusCode: 500,
      })
    );
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json(
      CreateResponse({
        success: true,
        message: successMessages.CAPTAIN_LOGGED_OUT_SUCCESSFULLY,
        statusCode: 200,
      })
    );
  } catch (error) {
    console.error("Error in captin logout:", error.message);
    return res.status(500).json(
      CreateResponse({
        success: false,
        message: error.message,
        statusCode: 500,
      })
    );
  }
};

export { register, login, profile, logout };
