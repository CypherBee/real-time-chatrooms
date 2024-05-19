import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

// authContext and useAuthContext are used to create a context and a custom hook to access the context
export const authContext = createContext();
export const useAuthContext = () => {
    return useContext(authContext);
};

//AuthContextProvider is a component that provides the authUser and setAuthUser to the children
export const AuthContextProvider = ({ children }) => {
    // Fixed: Json.parse is used to convert the string to an object
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("auth-user")) || null
    );

    // Can use useMemo to avoid re-rendering- not necessary in this case?

    return (
        <authContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </authContext.Provider>
    );
};
