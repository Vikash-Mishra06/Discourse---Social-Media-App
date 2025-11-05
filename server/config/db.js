import mongoose from "mongoose";

async function connectDb() {
  try {
    mongoose.connection.on('connected', () => console.log('Database connected'))
    await mongoose.connect(`${process.env.MONGODB_URL}/discourse`)
  } catch (error) {
    console.error('Database connection error:', error)
  }
}

export default connectDb