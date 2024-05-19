import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

async function verifyTokenAuth (req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res
                .status(401)
                .json({ error: "Access Denied - No token provided" });
        }

        const decodedToken  = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken ) {
            console.log("Invalid token in verifyToken middleware");
            return res
                .status(401)
                .json({ error: "Access Denied - Invalid token" });
        }

        const user = await User.findById(decodedToken.userId).select("-password");

        if (!user) {
            console.log("No user found in verifyToken middleware");
            return res
                .status(404)
                .json({ error: "Access Denied - No user found" });
        }

        // set user and continue to the ValidateRoom middleware
        req.user = user;
        next(); 
    } catch (error) {
        console.log("error in verifyToken middleware: ", error.message);
        res.status(400).json({ error: "Invalid Token" }); // or 500
    }
};

export default verifyTokenAuth;
