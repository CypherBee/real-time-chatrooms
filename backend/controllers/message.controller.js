// controllers/messageController.js
import Message from "../models/message.model.js";

export async function sendMessage(req, res) {
    const { message } = req.body;
    const senderId = req.user._id;
    const room = req.room; // Get the verified room from the middleware

    if (!message) {
        return res.status(400).json({ error: "Message cannot be empty" });
    }

    try {
        const newMessage = new Message({
            roomId: room._id,
            sender: senderId,
            message,
        });

        if (!newMessage) {
            return res
                .status(500)
                .json({ error: "Failed to create message - db model error" });
        }

        await newMessage.save();

        /* We do not emit the message here.
         Events emits are handled in the client side.
        It is HOWEVER more secure and reliable to emit the message from the backend
        - io.emit("new-message", {room:room._id, message: newMessage});
        **/

        /* 
        For consistency reasons between the results of getMessages and SendMessages,
        we populate the senderId field 
        **/

        const populatedMessage = await Message.findById(
            newMessage._id
        ).populate("sender");
        res.status(201).json(populatedMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
}

export async function getMessages(req, res) {
    try {
        const roomId = req.room._id;
        const messages = await Message.find({ roomId }).populate("sender");

        /* This is to check for the response from the database. 
        we still return an empty array if there are no message
        **/
        if (!messages) {
            return res
                .status(500)
                .json({ error: "Failed to retrieve messages" });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).json({ error: "Failed to retrieve messages" });
    }
}
