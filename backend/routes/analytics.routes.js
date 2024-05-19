import express from "express";
import { getMessageCountforRoom } from "../controllers/analytics.controller.js";
import { getUserCountforRoom } from "../controllers/analytics.controller.js";

const router = express.Router();

/* 
For demonstration purposes:
1. Routes are unprotected.
2. Get user count is used in the UseGetUserCount hook.
 **/

router.get("/rooms/:id/message-count", getMessageCountforRoom);
router.get("/rooms/:id/user-count", getUserCountforRoom);

export default router;
