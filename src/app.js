import express from "express";
import { Server } from "socket.io";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

import socketConfig from "../config/socket.config.js";
import routes from "./routes/index.routes.js";
import socketMiddleware from "./middlewares/socket.middleware.js";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);
// welcome message
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Node.js, Express and Socket.io API",
  });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 4200;

const io = new Server(server, socketConfig);

io.use(socketMiddleware.authMiddleware);
io.on("connection", (socket) => {
  console.log("New connection established");

  socket.on("disconnect", () => {
    console.log("Connection disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
