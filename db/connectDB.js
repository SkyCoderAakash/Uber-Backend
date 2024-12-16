import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Database is already connected.");
    }
    const conn = await mongoose.connect(process.env.DB_URI, {
      dbName: "Uber",
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error;
  }
};

export default connectDB;
