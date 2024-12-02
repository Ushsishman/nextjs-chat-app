"use client";

import { useUsers } from "@/contexts/usersContext";
import User from "../User/User";

const ChatHeader = () => {
  const { clickedUser } = useUsers();

  return (
    <div className="bg-[#3E3028] p-2">
      <div className="w-36 text-[#F2E2CE]">
        <User user={clickedUser} />
      </div>
    </div>
  );
};

export default ChatHeader;
