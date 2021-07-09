/**
 * @author @harsh2124
 * @description Entry file for server.
 */

const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const logger = require("./utils/logger");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

/**
 *  @description Establishing Server Connection.
 */
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}...`);
});

/**
 *  @description Connecting to MongoDB.
 */
connectDB();

app.use(routes);
