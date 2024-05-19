import Room from "./Room";
import useGetRooms from "../../hooks/useGetRooms";

const Rooms = () => {
    const { loading, rooms } = useGetRooms();
    const sortedRooms = rooms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {sortedRooms.map((room, index) => (
                <Room
                    key={room._id}
                    room={room}
                    lastIndex={rooms.length - 1 === index}
                />
            ))}
            {loading ? <span className="loading loading-spinner" /> : null}{" "}
        </div>
    );
};

export default Rooms;
