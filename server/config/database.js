const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });

        console.log("✅ MongoDB Connected Successfully!");

    } catch (error) {
        console.log("❌ MongoDB Connection Failed");
        console.log(error.message);
    }
};

module.exports = connectDB;