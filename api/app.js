require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const SignUpRouter = require("./routes/SignUpRouter");
const tokenRouter = require("./routes/tokenRouter");
const TransactionRouter = require("./routes/TransactionRouter");

const app = express();

const tokenChecker = (req, res, next) => {
  let token;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7);
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

app.use(logger("dev"));
app.use(express.json());

app.use("/signup", SignUpRouter);
app.use("/login", tokenRouter);
app.use("/transaction", tokenChecker, TransactionRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.loacals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({ message: "server error" });
});

module.exports = app;
