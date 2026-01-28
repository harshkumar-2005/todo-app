import mongoose from 'mongoose';

const connect = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("DB connection successfully.")
    }
    catch (e) {
        console.log(e);
        console.log("Error in connecting to database.");
    }
}

export default connect;