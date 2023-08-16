require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

const app = express();

module.exports = app;
