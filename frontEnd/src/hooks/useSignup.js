import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// Helper input validation function
function handleIputErrors({ fullName, username, password, confirmPassword }) {
    if (!fullName || !username || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters ");
        return false;
    }
    return true;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext(); 

    // Input validation
    const signup = async ({
        fullName,
        username,
        password,
        confirmPassword,
    }) => {
        const success = handleIputErrors({
            fullName,
            username,
            password,
            confirmPassword,
        });

        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    password,
                    confirmPassword,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error("An error occurred when signing up");
            }

            if (data.error) {
                throw new Error(data.error);
            }

            // setting Local storage
            localStorage.setItem("auth-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

