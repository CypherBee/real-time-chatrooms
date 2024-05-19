import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useRoom from "../globalRoomStates/useRoom";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const { selectedRoom, setMessages, messages } = useRoom();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedRoom._id}`);
                const data = await res.json();

                if (!res.ok) {
                    if (res.status === 403) {
                        throw new Error(
                            "You are not authorized to view messages in this room"
                        );
                    }
                    throw new Error(
                        data.error || "An error occurred when fetching messages"
                    );
                }

                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedRoom && selectedRoom.participants.includes(authUser._id)) {
            getMessages();
        }
    }, [selectedRoom, setMessages]);

    return { setMessages, loading, messages };
};

export default useGetMessages;
