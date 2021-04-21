require("express-async-errors");
const logger = require("./config/winston");
const winston = require("winston");
require("winston-mongodb");
const express = require("express");
var bodyParser = require("body-parser");
const app = express();

const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./startup/db");

require("dotenv").config();
const register = require("./routes/register");
const types = require("./routes/types");
const users = require("./routes/users");
const auth = require("./routes/auth");
const events = require("./routes/events");
const error = require("./middleware/error");
const mailSend = require("./routes/mailSend");
const notification = require("./routes/notifications");

app.use(express.json());
app.use(morgan("tiny"));

const { URL_FRONT_END } = process.env;

app.use(cors({ origin: URL_FRONT_END }));
// app.use(morgan('combined', { stream: logger.stream }));

//Use mongoose to connect to DataBase
connectDB();
// winston.add(new winston.transports.File({ filename: "logfile.log" }));
// winston.add(new winston.transports.MongoDB({ db: `${MONGO_URI}` }));

// winston.exceptions.handle(
//   new winston.transports.File({ filename: "exceptions.log" })
// );

// process.on("unhandledRejection", (ex) => {
//   throw ex;
// });

app.use("/api/types", types);
app.use("/api/register", register);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/event", events);
app.use("/api/send", mailSend);
app.use("/api/notification", notification);

app.use(error);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on port ${port}...`));
