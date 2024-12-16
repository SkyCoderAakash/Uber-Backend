import jwt from "jsonwebtoken";
import CreateResponse from "../utils/CreateResponce.js";
import { errorMessages } from "../constants.js";

const userAuth = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json(
        CreateResponse({
          success: false,
          message: errorMessages.AUTH_TOKEN_MISSING,
          statusCode: 401,
        })
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECERET);

    req.user = { _id: decoded._id };
    next();
  } catch (error) {
    console.error("Error in user authentication middleware:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json(
        CreateResponse({
          success: false,
          message: "Invalid token",
          statusCode: 401,
        })
      );
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json(
        CreateResponse({
          success: false,
          message: "Token has expired",
          statusCode: 401,
        })
      );
    }

    return res.status(500).json(
      CreateResponse({
        success: false,
        message: error.message,
        statusCode: 500,
      })
    );
  }
};

export { userAuth };
