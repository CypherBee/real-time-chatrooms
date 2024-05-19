import Messages from "./Messages";
import SendMessage from "./SendMessage";
import useRoom from "../../globalRoomStates/useRoom";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useGetUserCount from "../../hooks/useGetUserCount";

const MessageContainer = () => {
    const { selectedRoom, setSelectedRoom } = useRoom();
    const userCount = useGetUserCount();


    // clear selected room when component unmounts
    useEffect(() => {
        return () => {
            setSelectedRoom(null);
        };
    }, []);

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedRoom ? (
                <NoRoomPlaceholder />
            ) : (
                <>
                    <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between">
                        <div>
                            <span className="text-indigo-300 label-text">
                                Room:
                            </span>{" "}
                            <span className="text-indigo-100 font-bold">
                                {selectedRoom.roomName}
                            </span>
                        </div>
                        <span className="text-indigo-100 font-bold">
                            {`Joined users: ${userCount}`}
                        </span>
                    </div>
                    <Messages />
                    <SendMessage />
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoRoomPlaceholder = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome {authUser.fullName} 🦍 </p>
                <p>Select a Room to start messaging</p>
            </div>
        </div>
    );
};
