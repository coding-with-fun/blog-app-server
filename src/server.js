const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(4000, () => {
    logger.info("Server is running on port 4000...");
});
