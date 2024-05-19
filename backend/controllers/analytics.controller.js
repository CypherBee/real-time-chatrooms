// Import Message model. Room Ids are stored in the message documents.
import Message from "../models/message.model.js";
import Room from "../models/room.model.js";

export const getMessageCountforRoom = async (req, res) => {
    try {
        const { id: roomId } = req.params;
        // check if the room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        const messageCount = await Message.countDocuments({ roomId });
        res.status(200).json({ messageCount });
    } catch (error) {
        console.error(
            "Error in getMessageCountforRoom at Analytics Controller",
            error
        );
        res.status(500).json({
            error: `Server Error while getting message count -- ${error.reason}`,
        });
    }
};

export const getUserCountforRoom = async (req, res) => {
    try {
        const { id: roomId } = req.params;
        // check if the room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        const userCount = room.participants.length;
        res.status(200).json({ userCount });
    } catch (error) {
        console.error(
            "Error in getUserCountforRoom at Analytics Controller",
            error
        );
        res.status(500).json({
            error: `Server Error while getting user count -- ${error.reason}`,
        });
    }
};
