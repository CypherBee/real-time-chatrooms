import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useRoom from "../globalRoomStates/useRoom";
import { useAuthContext } from "../context/AuthContext";

const useGetRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const { onlyJoinedRooms, roomJoined, roomAdded } = useRoom();

    useEffect(() => {
        const getRooms = async () => {
            setLoading(true);
            const url = onlyJoinedRooms
                ? `/api/rooms/:${authUser._id}`
                : "/api/rooms";
            try {
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.error || "An error occurred when fetching rooms"
                    );
                }

                setRooms(data);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        // call getRooms function or pass it down to the component that uses the hook
        getRooms();

        /* Update on two cases:
        1. When the user joins a room
        2. When the user changes the filter to show only joined rooms 
        */
    }, [onlyJoinedRooms, roomJoined, roomAdded]);
    return { rooms, loading };
};

export default useGetRooms;
