const requireMessgae = {
  First_Name_Required: "First name is required",
  Last_Name_Required: "Last name is required",
  Email_Required: "Email is required",
  Password_Required: "Password is required",
  Vehicle_Color_Required: "Vehicle color is required",
  Vehicle_Number_Plate_Required: "Vehicle number plate is required",
  Vehicle_Capicity_Required: "Vehicle capicity is required",
  Vehicle_Type_Required: "Vehicle type is required",
};

// error messages
const errorMessages = {
  USER_ALREADY_EXISTS: "User already exist",
  PLEASE_FILL_MANDATORY_FILEDS: "Please fill all mandatory fields",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  CAPTAIN_ALREADY_EXISTS: "Captain already exist",
  USER_NOT_FOUND: "User not found",
  CAPTAIN_NOT_FOUND: "Captain not found",
  AUTH_TOKEN_MISSING:"Authentication token missing or invalid"
};

const successMessages = {
  USER_REGISTERED_SUCCESSFULLY: "User created successfully",
  USER_LOGGED_IN_SUCCESSFULLY: "User loggin seccessfully",
  CAPTAIN_REGISTERED_SUCCESSFULLY: "Captain created successfully",
  CAPTAIN_LOGGED_IN_SUCCESSFULLY: "Captain loggin seccessfully",
  USER_PROFILE_GET_SUCCESSFULLY: "User profile fetched successfully",
  CAPTAIN_PROFILE_GET_SUCCESSFULLY: "Captain profile fetched successfully",
  USER_LOGGED_OUT_SUCCESSFULLY: "User logged out successfully",
  CAPTAIN_LOGGED_OUT_SUCCESSFULLY: "Captain logged out successfully",

};

export { requireMessgae, errorMessages, successMessages };
