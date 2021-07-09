/**
 * @author @harsh2124
 * @description Entry file for server.
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./utils/db");
const logger = require("./utils/logger");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(
    morgan(process.env.ENV === "DEV" ? "dev" : "combined", {
        stream: logger.stream,
    })
);

/**
 *  @description Connecting to MongoDB.
 */
connectDB().then(() => {
    /**
     *  @description Establishing Server Connection.
     */
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}...`);
    });

    app.use(routes);
});
