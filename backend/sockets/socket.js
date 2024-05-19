import { Server } from "socket.io";
import http from "http";
import express from "express";
import { instrument } from "@socket.io/admin-ui";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

/* 
This map will be used to keep track of users and their sockets.
After the code was refactored, its no longer used.
*/
const userSocketMap = new Map();

// Handle new socket connections
io.on("connection", (socket) => {
    console.log("New connection:", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        userSocketMap.set(userId, socket.id);
    }

    // Handle 'joinRoom' event
    socket.on("listen-room", (room) => {
        console.log(`userId ${userId} listening to room:`, room);
        try {
            socket.join(room);
        } catch (error) {
            console.error(
                `Error listetining to ${room} for userId ${userId}:`,
                error
            );
        }
    });

    // Handle 'new-message' event
    socket.on("new-message", (data) => {
        try {
            const { roomId, message } = data;
            if (roomId && message) {
                socket.to(roomId).emit("new-message", message);
            } else {
                console.error("Invalid message data:", data);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    });

    // Handle socket disconnection
    socket.on("disconnect", () => {
        if (userId && userId !== "undefined") {
            userSocketMap.delete(userId);
        }
        console.log("User disconnected:", socket.id);
    });
});

// Access the admin ui at admin.socket.io
// use localhost:5000 without password
instrument(io, { auth: false });

export { app, io, server };
