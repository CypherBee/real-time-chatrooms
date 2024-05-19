import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import room from "./routes/room.routes.js";
import analytics from "./routes/analytics.routes.js";

import connectDB from "./db/connectDB.js";
import { app, server } from "./sockets/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json()); // to parse the incoming request with JSON payloads - from req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/rooms", room);
app.use("/api/analytics", analytics);

app.use(express.static(path.join(__dirname, "/frontEnd/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontEnd", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
