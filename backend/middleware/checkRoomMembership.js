// middleware/roomMembership.js
import Room from "../models/room.model.js";

async function checkRoomMembership(req, res, next) {
    const { id: roomId } = req.params;
    const userId = req.user._id;

    const room = await Room.findById(roomId);

    if (!room) {
        console.log(
            "Error in the checkRoomMembership Middleware: Room not found"
        );
        return res.status(404).json({ error: "Room not found" });
    }

    if (!room.participants.includes(userId)) {
        console.log(
            "Error in the checkRoomMembership Middleware: Participant not authorized"
        );
        return res.status(403).json({ error: "User not a member of the room" });
    }
    
    // Set the room in the request object and continue
    req.room = room;
    next();
}
export default checkRoomMembership;
