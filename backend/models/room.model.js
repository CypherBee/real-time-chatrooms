import mongoose from "mongoose";

const roomschema = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: true,
            unique: true,
        },

        roomCode: {
            type: String,
            required: true,
        },
        
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", roomschema);

export default Room;
