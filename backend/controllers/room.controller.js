import Room from "../models/room.model.js";
import bcrypt from "bcryptjs";

// Utility function for sending error responses
function sendErrorResponse(res, statusCode, message) {
    return res.status(statusCode).json({ error: message });
}

// Utility function to hash room code
async function hashRoomCode(roomCode) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(roomCode, salt);
}

export const createRoom = async (req, res) => {
    try {
        const { roomName, roomCode } = req.body;
        if (!roomName || !roomCode) {
            return sendErrorResponse(
                res,
                400,
                "Both room name and room code are required."
            );
        }

        // Check if the room already exists--roomName should IS unique
        const roomExists = await Room.findOne({ roomName });
        if (roomExists) {
            return sendErrorResponse(res, 400, "Room already exists");
        }

        // We can also salt it.
        const hashedCode = await hashRoomCode(roomCode);

        // Create and save the room
        const newRoom = new Room({
            roomName,
            roomCode: hashedCode,
            participants: [req.user._id],
        });
        await newRoom.save();

        // Send the room back to the client without the room code
        const savedRoom = await Room.findById(newRoom._id).select("-roomCode");
        res.status(201).json(savedRoom);
    } catch (error) {
        console.error("Error in createRoom at Room controller", error);
        sendErrorResponse(
            res,
            500,
            "Something went wrong in creating the room"
        );
    }
};

export const joinRoom = async (req, res) => {
    try {
        /* Nessesary data validation including:
        - Check if the room exists
        - Check if the room code is valid
        - Check if the user is already in the room
        **/
        const { roomName, roomCode } = req.body;
        if (!roomName || !roomCode) {
            return sendErrorResponse(
                res,
                400,
                "Both room name and room code are required."
            );
        }

        const room = await Room.findOne({ roomName });
        if (!room) {
            return sendErrorResponse(res, 404, "Room not found");
        }

        const validCode = await bcrypt.compare(roomCode, room.roomCode);
        if (!validCode) {
            return sendErrorResponse(res, 400, "Invalid code");
        }

        if (room.participants.includes(req.user._id)) {
            return sendErrorResponse(res, 400, "User already in the room");
        }

        // Add the user to the room and save
        room.participants.push(req.user._id);
        await room.save();

        res.status(200).json(room);
    } catch (error) {
        console.error("Error in joinRoom at Room Controller", error);
        sendErrorResponse(res, 500, "Server Error while joining room");
    }
};

export const getUserRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ participants: req.user._id }).select(
            "-roomCode"
        );

        if (!rooms) {
            return sendErrorResponse(
                res,
                500,
                "error in getting rooms for the user"
            );
        }

        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error in getUserRooms at Room Controller", error);
        sendErrorResponse(res, 500, "Server Error while getting rooms");
    }
};

/* TODO: 
rename this function to getAllRooms except the ones the user is in.
**/
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({
            participants: { $nin: [req.user._id] },
        }).select("-roomCode");

        /* This checks the response from the database,
        we still return an empty array if there are no rooms **/
        if (!rooms) {
            return sendErrorResponse(res, 500, "error in getting all rooms");
        }

        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error in getAllRooms at Room Controller", error);
        sendErrorResponse(res, 500, "Server Error while getting rooms");
    }
};
