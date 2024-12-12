"use client";

import { FaUserGroup } from "react-icons/fa6";
import { RoomData } from "@/interfaces/room";

const Room = ({ room }: { room: RoomData }) => {
  return (
    <div className="p-2 pr-3 flex flex-row items-center rounded-full hover:bg-[#F2E2CE] hover:text-[#735645] cursor-pointer">
      <div className="mr-2">
        <FaUserGroup size="40" />
      </div>
      <p className="font-bold">{room.roomName}</p>
    </div>
  );
};

export default Room;
