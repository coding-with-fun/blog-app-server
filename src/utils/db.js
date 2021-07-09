/**
 * @author @harsh2124
 * @description Connection to MongoDB.
 */

const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async () => {
    try {
        /**
         * @description Connecting to MongoDB.
         */
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        logger.info("MongoDB is connected!!");
    } catch (error) {
        logger.error(`${error.message}`);

        /**
         * @description Exit process with failure
         */
        process.exit(1);
    }
};

module.exports = connectDB;
