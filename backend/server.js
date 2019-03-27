const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
var cors = require('cors')

const API_PORT = 3001;
const accounts = require("./routes/signin");
const data = require("./routes/data");
const app = express();
const router = express.Router();

app.use(cors());

// this is our MongoDB database
const dbRoute = "mongodb://admin:Q9GYTRLFbfdEbfa(@ds119445.mlab.com:19445/client-management-system";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/api/account", accounts);
app.use("/api/data", data);

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));