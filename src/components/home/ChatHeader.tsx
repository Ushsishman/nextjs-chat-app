"use client";

import { useData } from "@/contexts/dataContext";
import User from "../User/User";
import Room from "../Room/Room";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import { useResponsive } from "@/contexts/responsiveContext";

const ChatHeader = () => {
  const { clickedUser, currentChat, clickedRoom } = useData();
  const { openSidebar, setOpenSidebar } = useResponsive();

  return (
    <div className="bg-[#3E3028] p-2 flex flex-row items-center">
      {openSidebar === false && (
        <Button size="icon" onClick={() => setOpenSidebar(true)} className="mr-2">
          <FaArrowRight />
        </Button>
      )}
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
