import React, { useState } from "react";
import useRoom from "../../globalRoomStates/useRoom";
import AddRoom from "../Modals/AddRoom";

const RoomsSelector = () => {
    const { onlyJoinedRooms, setOnlyJoinedRooms } = useRoom();

    return (
        <div className="flex items-center justify-center gap-2 m-2">
            <button
                className={`btn
                ${!onlyJoinedRooms ? "bg-indigo-400 text-white" : ""}
                `}
                onClick={() => setOnlyJoinedRooms(false)}
            >
                Other Rooms
            </button>
            <button
                className={`btn
                ${onlyJoinedRooms ? "bg-indigo-400 text-white" : ""}
                `}
                onClick={() => setOnlyJoinedRooms(true)}
            >
                Your Rooms
            </button>
            <AddRoom />
        </div>
    );
};

export default RoomsSelector;
