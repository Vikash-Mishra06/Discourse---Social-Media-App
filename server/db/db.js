import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to Db");
  } catch (error) {
    console.log('Error connecting to Db', error);
  }
}

export default connectDb