import { errorMessages, successMessages } from "../constants.js";
import userModel from "../model/userModel.js";
import CreateResponse from "../utils/CreateResponce.js";

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json(
        CreateResponse({
          success: false,
          message: errorMessages.PLEASE_FILL_MANDATORY_FILEDS,
          statusCode: 400,
        })
      );
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json(
        CreateResponse({
          success: false,
          message: errorMessages.USER_ALREADY_EXISTS,
          statusCode: 400,
        })
      );
    }
    const hashPassword = await userModel.hashPassword(password);
    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await user.save();
    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: process.env.TOKEN_EXPIRY * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(
      CreateResponse({
        message: successMessages.USER_REGISTERED_SUCCESSFULLY,
        data: {
          user: {
            firstName,
            lastName,
            email,
            _id: user._id,
          },
          token,
        },
        statusCode: 201,
      })
    );
  } catch (error) {
    console.error("Error in user registration:", error.message);
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

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json(
        CreateResponse({
          success: false,
          message: errorMessages.INVALID_EMAIL_OR_PASSWORD,
          statusCode: 400,
        })
      );
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json(
        CreateResponse({
          success: false,
          message: errorMessages.INVALID_EMAIL_OR_PASSWORD,
          statusCode: 400,
        })
      );
    }

    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: process.env.TOKEN_EXPIRY * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(
      CreateResponse({
        message: successMessages.USER_LOGGED_IN_SUCCESSFULLY,
        data: {
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          token,
        },
        statusCode: 200,
      })
    );
  } catch (error) {
    console.error("Error in user login:", error.message);
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
    const { _id } = req?.user;
    const user = await userModel.findOne({ _id });

    if (!user) {
      return res.status(404).json(
        CreateResponse({
          success: false,
          message: errorMessages.USER_NOT_FOUND,
          statusCode: 404,
        })
      );
    }

    return res.status(200).json(
      CreateResponse({
        success: true,
        message: successMessages.USER_PROFILE_GET_SUCCESSFULLY,
        data: user,
        statusCode: 200,
      })
    );
  } catch (error) {
    console.error("Error in user profile:", error.message);
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
        message: successMessages.USER_LOGGED_OUT_SUCCESSFULLY,
        statusCode: 200,
      })
    );
  } catch (error) {
    console.error("Error in user logout:", error.message);
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
