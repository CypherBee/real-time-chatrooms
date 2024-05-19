import { useEffect, useState } from "react";
import useRoom from "../globalRoomStates/useRoom";

// This hook is used to get the number of users in a room
// unnecessary but for demonstration purposes for the analytics route
const useGetUserCount = () => {
    const { selectedRoom } = useRoom(); // Access selectedRoom from your custom hook
    const [userCount, setUserCount] = useState(0); // State to store the user count

    useEffect(() => {
        const fetchUserCount = async () => {
            if (!selectedRoom || !selectedRoom._id) {
                return;
            }
            try {
                const response = await fetch(
                    `api/analytics/rooms/${selectedRoom._id}/user-count`
                );
                const data = await response.json();

                if (response.ok) {
                    setUserCount(data.userCount);
                } else {
                    throw new Error(
                        data.error ||
                            "An error occurred when fetching user count"
                    );
                }
            } catch (error) {
                console.error("Fetching user count failed:", error);
            }
        };

        fetchUserCount();
    }, [selectedRoom]);

    return userCount; // Return the user count for use in your components
};

export default useGetUserCount;
