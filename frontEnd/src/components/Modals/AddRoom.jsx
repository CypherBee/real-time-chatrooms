import { useState } from "react";
import toast from "react-hot-toast";
import { MdAddCircleOutline } from "react-icons/md";
import useRoom from "../../globalRoomStates/useRoom";

// TODO: seperate the logic into a custom hook
const AddRoom = () => {
    const { setSelectedRoom, incrementRoomAdded } = useRoom();
    const [isOpen, setIsOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [roomCode, setRoomCode] = useState("");

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        closeModal();

        // send the roomName and roomCode to the server
        try {
            const res = await fetch("/api/rooms/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roomName,
                    roomCode,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create the room");
            }

            toast.success(`Room ${data.roomName} created successfully`);
            /* wait for 1 second before setting the selected room */
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Modify the global state to reflect the new room & update the room list
            setSelectedRoom(data);
            incrementRoomAdded();
        } catch (error) {
            toast.error(error.message || "Failed to create the room");
        }
    };

    return (
        <>
            <div className="cursor-pointer" onClick={openModal}>
                <MdAddCircleOutline size={45} color="white" />
            </div>

            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box relative">
                        <h3 className="font-bold text-lg">Create a New Room</h3>
                        <p className="py-4">
                            Fill out the form below to create a new chat room.
                        </p>
                        <form className="">
                            <input
                                type="text"
                                placeholder="Room Name"
                                className="input input-bordered w-full max-w-xs mb-4"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Room Code"
                                className="input input-bordered w-full max-w-xs"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value)}
                            />
                            <div className="modal-action">
                                <button
                                    type="submit"
                                    className="btn"
                                    onClick={handleCreateRoom}
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddRoom;
