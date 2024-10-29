import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { initializeStatistics } from '../models/statisticModel.js';

dotenv.config()
const dbURL = process.env.MONGO_URI

const connectDB = async () => {
   try {
      await mongoose.connect(dbURL, {
         // useNewUrlParser: true,
         // useUnifiedTopology: true,
      })
      await initializeStatistics();
      console.log('MongoDB connected')
   } catch (err) {
      console.log('Bad connect to MongoDB', err)
      process.exit(1)
   }
}

export default connectDB
