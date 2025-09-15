import mongoose from 'mongoose';
import { DB_NAME } from '../utils/constants.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(
            `MONGODB CONNECTED SUCCESSFULLY ! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error(`MONGODB CONNECTION ERROR:`, error);
        process.exit(1);
    }
};

export { connectDB };
