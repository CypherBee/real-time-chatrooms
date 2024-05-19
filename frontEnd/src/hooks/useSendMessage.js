import { useState } from "react";
import useRoom from "../globalRoomStates/useRoom";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { selectedRoom, messages, setMessages } = useRoom();
    const { socket } = useSocketContext();

    const sendMessage = async (message) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/messages/send/${selectedRoom._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.error || "An error occurred when sending message"
                );
            }

            setMessages([...messages, data]);

            socket.emit("new-message", {
                roomId: selectedRoom._id,
                message: data,
            });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, sendMessage };
};

export default useSendMessage;
