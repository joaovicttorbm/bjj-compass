import mongoose from "mongoose";
import { config } from "../config/app.config.js";

const connectDatabase = async () => {
  console.log("Connected...");
  try {
    await mongoose.connect(config.MONGO_URI);
    console.info("Connected to Mongo database");
  } catch (error) {
    console.error("Error connecting to Mongo database");
    process.exit(1);
  }
};

export default connectDatabase;