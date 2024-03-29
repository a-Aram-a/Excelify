import config from 'config';
import mongoose from 'mongoose';

export default function initDb() {
    mongoose.connect(config.MONGO_URI)
        .then(() => console.log('MongoDB Connected!'))
        .catch((err) => console.log('MongoDB Connection Error: ', err))
}
