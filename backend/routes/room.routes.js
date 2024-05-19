import express from "express";
import verifyTokenAuth from "../middleware/verifyTokenAuth.js";
import {
    createRoom,
    joinRoom,
    getAllRooms,
    getUserRooms
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/create/", verifyTokenAuth, createRoom);
router.post("/join/", verifyTokenAuth, joinRoom);
router.get("/", verifyTokenAuth, getAllRooms); // get all rooms
router.get("/:id", verifyTokenAuth, getUserRooms); // get all rooms

export default router;
