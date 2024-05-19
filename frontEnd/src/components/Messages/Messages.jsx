import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessagePlaceholder from "../LoadingPlaceholders/MessageLoading";
import { useEffect, useRef } from "react";
import { useSocketContext } from "../../context/SocketContext";

const Messages = () => {
    const { socket } = useSocketContext();
    const { messages, loading, setMessages } = useGetMessages();

    // listen for new messages - Put into a custom hook later w/ useEffect and cleanup.
    socket?.on("new-message", (newMessage) => {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
    });

    const lastMessageRef = useRef(null);

    // util function to generate placeholders for loading state
    const generatePlaceholders = (count) =>
        Array.from({ length: count }, (_, index) => (
            <MessagePlaceholder key={index} />
        ));

    // Scroll to the last message when the component mounts
    useEffect(() => {
        setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }, 150);
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {loading && generatePlaceholders(3)}

            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}

            {!loading && messages.length === 0 && (
                <p className="text-center text-indigo-200 pt-20">
                    Start the Conversation by sending a msg 🚀
                </p>
            )}
        </div>
    );
};

export default Messages;
