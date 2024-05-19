import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import verifyTokenAuth from "../middleware/verifyTokenAuth.js";
import checkRoomMembership from "../middleware/checkRoomMembership.js";

const router = express.Router();

router.post("/send/:id", verifyTokenAuth, checkRoomMembership, sendMessage); 
router.get("/:id", verifyTokenAuth, checkRoomMembership, getMessages); 

export default router;
