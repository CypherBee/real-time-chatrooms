import Search from "./Search";
import Rooms from "./Rooms";
import LogoutButton from "./LogoutButton";
import RoomsSelector from "./RoomsSelector";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="border-r border-stone-500 p-4 flex flex-col">
            <p className="text-indigo-200 text-2xl ml-3">
                Welcome, {authUser.fullName}
            </p>
            <RoomsSelector />
            <Search />
            <div className="divider px-3"></div>
            <Rooms />
            <div className="divider px-3"></div>

            <LogoutButton />
        </div>
    );
};

export default Sidebar;
