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
let allowedDomains = process.env.FRONTEND_URL;

if (process.env.ENV === "DEV") {
    allowedDomains = [allowedDomains, "localhost:3000"];
}

const msg = `This site does not have an access. Only specific domains are allowed to access it.`;

app.use(express.json());
app.use(
    cors({
        credentials: true,
        // eslint-disable-next-line object-shorthand
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedDomains.indexOf(origin) !== -1) {
                return callback(null, true);
            }

            return callback(new Error(msg), false);
        },
    })
);

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
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    app.use("/api", routes);
});
