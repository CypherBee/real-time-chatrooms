import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import useRoom from "../globalRoomStates/useRoom";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useContext(authContext);
    const { setMessages, setSelectedRoom } = useRoom();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            if (!res.ok) {
                if (!res.ok) {
                    throw new Error(
                        data.error || "Logout failed - Server error"
                    );
                }
            }

            toast.success("Logged out successfully");

            /* resetting the global state for messages and selectedRoom
            resetting authentication data */
            localStorage.removeItem("auth-user");
            setMessages([]);
            setSelectedRoom(null);
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading };
};

export default useLogout;
