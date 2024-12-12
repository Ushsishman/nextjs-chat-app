"use client";

import { useData } from "@/contexts/dataContext";
import User from "../User/User";
import Room from "../Room/Room";

const ChatHeader = () => {
  const { clickedUser, currentChat, clickedRoom } = useData();

  return (
    <div className="bg-[#3E3028] p-2">
      {currentChat === "userChat" && (
        <div className="w-36 text-[#F2E2CE]">
          <User user={clickedUser} />
        </div>
      )}
      {currentChat === "groupChat" && (
        <div className="w-36 text-[#F2E2CE]">
          <Room room={clickedRoom} />
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
