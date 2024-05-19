import useRoom from "../../globalRoomStates/useRoom";
import { SocketContext } from "../../context/SocketContext";
import { useContext } from "react";
import { ImEnter } from "react-icons/im";
import { useAuthContext } from "../../context/AuthContext";
import JoinRoom from "../Modals/JoinRoom";
import { useState } from "react";

const Room = ({ room, lastIndex }) => {
    const { socket } = useContext(SocketContext);
    const { selectedRoom, setSelectedRoom } = useRoom();
    const { authUser } = useAuthContext();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const isSelected = selectedRoom?._id === room._id;

    // This function checks if the room is locked for the user.
    const isLocked = () => {
        return !room.participants.includes(authUser._id);
    };

    const handleRoomClick = () => {
        setSelectedRoom(room);

        // Open the modal if the room is locked.
        if (isLocked()) {
            setIsModalOpen(true);
        }

        // If the room is not locked, join the room.
        else {
            socket.emit("listen-room", room._id, (error) => {
                if (error) {
                    console.error("Error joining room:", error);
                }
            });
        }
    };

    return (
        <>
            <div
                className={`flex items-center gap-2 p-2 py-1 cursor-pointer hover:bg-indigo-400 rounded
                ${isSelected ? "bg-indigo-400" : ""} 
                `}
                onClick={handleRoomClick}
            >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                        src="https://source.boringavatars.com/pixel/120/Stefan?colors=26a653,2a1d8f,79646a"
                        alt="user icon"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between gap-3">
                        <p className="font-bold text-stone-200">
                            {room.roomName}
                        </p>
                        {isLocked() && (
                            <div className="cursor-pointer">
                                <ImEnter size={30} style={{ color: "wheat" }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {!lastIndex && (
                <div className="divider h-px my-0 py-0 bg-indigo-500 w-5/6 " />
            )}
            <JoinRoom
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Room;
