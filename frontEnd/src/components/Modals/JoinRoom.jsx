import { useState } from "react";
import toast from "react-hot-toast";
import useRoom from "../../globalRoomStates/useRoom";

// TODO: seperate the logic into a custom hook
const JoinRoom = ({ isOpen, onClose }) => {
    const [roomCode, setRoomCode] = useState("");
    const { selectedRoom, setSelectedRoom, incrementRoomJoined } = useRoom();

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        onClose();

        // Attempt to join the room using the roomCode
        try {
            const res = await fetch("/api/rooms/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roomName: selectedRoom.roomName,
                    roomCode,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(`Joined room ${data.roomName} successfully`);
                setSelectedRoom(data);
            } else {
                throw new Error(data.error || "Failed to join the room");
            }
            incrementRoomJoined();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to join the room");
        }
    };

    // Return the component only if the modal is open
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="modal modal-open"
                style={{ display: isOpen ? "block" : "none" }}
            >
                <div className="modal-box relative">
                    <h3 className="font-bold text-lg">Join a Room</h3>
                    <p className="py-4">Enter the room code to join.</p>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="password"
                            placeholder="Room Code"
                            className="input input-bordered w-full max-w-xs mb-4"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                        />
                        <div className="modal-action">
                            <button type="submit" className="btn">
                                Join
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default JoinRoom;
