import { useState } from "react";
import useRoom from "../../globalRoomStates/useRoom";
import useGetRooms from "../../hooks/useGetRooms";
import toast from "react-hot-toast";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Search = () => {
    const [search, setSearch] = useState("");
    const { setSelectedRoom } = useRoom();
    const { rooms } = useGetRooms();

    const handleSumbit = (e) => {
        e.preventDefault();
        if (!search || search.length < 3) return;
        /* Very basic search component that searches for rooms by name
         **/
        const room = rooms.find((room) =>
            room.roomName.toLowerCase().includes(search.toLowerCase())
        );

        if (room) {
            setSelectedRoom(room);
            setSearch("");
        } else {
            toast.error("No room found with that name");
        }
    };

    return (
        <form onSubmit={handleSumbit} className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search rooms"
                className="input input-bordered rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                type="submit"
                className="btn btn-circle bg-indigo-400 text-white"
            >
                <HiMagnifyingGlass />
            </button>
        </form>
    );
};

export default Search;
