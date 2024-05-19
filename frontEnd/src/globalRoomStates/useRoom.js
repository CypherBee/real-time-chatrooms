import { create } from "zustand";

const useRoom = create((set) => ({

    onlyJoinedRooms: true,
    setOnlyJoinedRooms: (bool) => set({ onlyJoinedRooms: bool }),
    selectedRoom: null,
    setSelectedRoom: (room) => set({ selectedRoom: room }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    roomJoined: 0,
    incrementRoomJoined: () => set((state) => ({ roomJoined: state.roomJoined + 1 })),
    roomAdded: 0,
    incrementRoomAdded: () => set((state) => ({ roomAdded: state.roomAdded + 1 })),
}));


export default useRoom;