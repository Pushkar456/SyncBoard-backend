import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`);

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;