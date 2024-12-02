"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMain from "./ChatMain";
import { useUsers } from "@/contexts/usersContext";

const ChatContainer = () => {
  const { clickedUser } = useUsers();

  return (
    <>
      {clickedUser !== null && (
        <div className="h-screen flex flex-col justify-between">
          <ChatHeader />
          <ChatMain />
          <ChatInput />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
