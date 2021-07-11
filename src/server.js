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

    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Request methods you wish to allow
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );

        // Request headers you wish to allow
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type"
        );

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader("Access-Control-Allow-Credentials", true);

        // Pass to next layer of middleware
        next();
    });

    app.use("/api", routes);
});
