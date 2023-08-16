const app = require("../app");
const debug = require("debug")("pencepulse:server");
const http = require("http");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
app.set("port", PORT);
