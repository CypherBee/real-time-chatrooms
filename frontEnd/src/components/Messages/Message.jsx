import { useAuthContext } from "../../context/AuthContext";
import getTime from "../../utils/getTime";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();

    const fromCurrentUser = message.sender._id === authUser._id;
    const chatClass = fromCurrentUser ? "chat-end" : "chat-start";
    const backgroundColor = fromCurrentUser ? "bg-indigo-500" : "";

    const profilePicture = fromCurrentUser
        ? authUser.profilePicture
        : message.sender.profilePicture;

    const formattedDate = getTime(message.createdAt);
    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClass}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={profilePicture}
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white pb-2 ${backgroundColor} ${shakeClass} `}>
                {message.message}
            </div>
            <div className="chat-footer   text-white opacity-50 text-xs flex gap-1 items-center">
                {formattedDate}{" "}
                {fromCurrentUser ? "You" : message.sender.username}
            </div>
        </div>
    );
};

export default Message;
