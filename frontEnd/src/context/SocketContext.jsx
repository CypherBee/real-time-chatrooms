import { createContext, useState, useContext, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser == null) return;

        // TODO: add the URL as an environment variable
        const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
            query: { userId: authUser._id },
        });

        setSocket(newSocket);

        return () => newSocket.close();
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
