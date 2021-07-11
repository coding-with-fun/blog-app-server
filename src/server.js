/* eslint-disable object-shorthand */
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
const allowedDomains = ["http://127.0.0.1:3000", "http://localhost:3000"];

app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (
                allowedDomains.indexOf(origin) !== -1 ||
                origin.includes("https://coderc-blog.vercel.app")
            ) {
                return callback(null, true);
            }

            const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
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

    app.use("/api", routes);
});
