const app = require("../app");
const debug = require("debug")("pencepulse:server");
const http = require("http");
const mongoose = require("mongoose");

const PORT = normalizePort(process.env.PORT || "8080");
app.set("port", PORT);

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://0.0.0.0/pencepulse";
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const server = http.createServer(app);

server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `Pipe ${addr}` : `Port ${addr.port}`;
  console.log(`Listening on ${bind}`);
  debug(`Listening on ${bind}`);
}
