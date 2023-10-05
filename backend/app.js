const express = require("express");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
const routes = require("./src/routes");
const ApiError = require("./src/utils/ApiError");

require("./src/config/sequelize");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", routes);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    error: "Internal Server Error",
  });
});

const port = process.env.PORT ? process.env.PORT : 5000;

app.listen(port, () => {
  // eslint-disable-next-line padded-blocks
  console.log(`Listening to Port: ${port}`);
});
