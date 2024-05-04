import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

console.table(process.env);

// const envPath = `../env/.env.development`;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}...`); //
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
