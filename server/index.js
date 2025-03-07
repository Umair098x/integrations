require("express-async-errors");
const winston = require("winston");
const express = require("express");
const app = express();
const err = require("./middleware/err");
const routehandler = require("./routes");
const bodyParser = require("body-parser");
const passport = require("./passport/index");
const session = require("express-session");
global.__basedir = __dirname;

const PORT = 30007;

const fileTransport = new winston.transports.File({
  filename: "error.log",
  level: "error",
});

const consoleTransport = new winston.transports.Console();
const uncaughtExceptionTransport = new winston.transports.File({
  filename: "uncaughtException.log",
});
const logFileTransport = new winston.transports.File({
  filename: "logfile.log",
});
// Add mysqlTransport if needed

const logger = winston.createLogger({
  transports: [
    consoleTransport,
    fileTransport,
    uncaughtExceptionTransport,
    logFileTransport,
  ],
});

app
  .listen(PORT, () => console.log(`express is running on ${PORT}`))
  .on("error", function (err) {
    console.log(err);
  });

// Unhandled exceptions and rejections
process.on("uncaughtException", (error) => {
  logger.error(error.message, error);
  process.exit(1);
});

winston.exceptions.handle([
  new winston.transports.Console(),
  new winston.transports.File({ filename: "uncaughtException.log" }),
]);

/* Route middlewares */
const allowedOrigins = [
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:3002",
  `${process.env.BASE_URL}`,
];

/* Cors Setup */
const cors = require("cors");
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(session({ secret: "SECRET", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

console.log("testing");
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routehandler);
app.use(err);
