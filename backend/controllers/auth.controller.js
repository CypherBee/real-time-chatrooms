import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateJWTAndCookie from "../utilitites/generateJWT.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        //hasing and salting the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Hardcoding the profile picture for now
        const profilePicture = `https://robohash.org/${username}`;

        // Creating the request body
        const newUser = new User({
            fullName,
            password: hashedPassword,
            username,
            profilePicture,
        });

        if (newUser) {
            //generate a token, save the user in the db and send the response
            generateJWTAndCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in siugnup controller", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const validPassword = await bcrypt.compare( password,user?.password || ""); 

        if (!user || !validPassword) {
            return res.status(400).json({ error: "Invalid credentials" }); 
        }

        //generate a token and send the response
        generateJWTAndCookie(user._id, res); 
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt"); // or set maxAge to 0
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};
