import jwt from "jsonwebtoken";

const generateJWTAndCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in ms
        httpOnly: true, // prevent XSS attacks - client side js cannot access the cookie
        sameSite: "strict", // CSRF protection
        secure: process.env.NODE_ENV === "production" ? true : false, // cookie will only be set in https in production
    });
};

export default generateJWTAndCookie;
