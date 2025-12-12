export * from "./schemas"

import mongoose from "mongoose";

const DB_NAME = "trading_n8n"

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MongoDB Connected... DB HOST : ${connectionInstance.connection.host}`);
  } catch (err) {
    console.error("Mongo DB Connection Error : ", err);
    process.exit(1);
  }
};