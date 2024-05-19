import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// helper function to handle input errors
function handleIputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill all fields");
        return false;
    }
    return true;
}

const uselogin = () => {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const login = async ({ username, password }) => {
        const success = handleIputErrors({ username, password });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error("Invalid credentials");
                } else {
                    throw new Error( data.error||"An error occurred when logging in");
                }
            }
            
            // store the user in local storage
            localStorage.setItem("auth-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Logged in successfully");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default uselogin;
