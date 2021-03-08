require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();

    app.set("view engine", "ejs");
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());

    app.use("/api/mock", routes);

    app.listen(PORT, () => {
      console.log("Server has started!");
    });
  });
