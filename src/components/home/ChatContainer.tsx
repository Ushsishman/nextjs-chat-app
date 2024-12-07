"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMain from "./ChatMain";
import { useUsers } from "@/contexts/usersContext";
import bgChat from "../../../public/chat.png";
import Image from "next/image";

const ChatContainer = () => {
  const { clickedUser } = useUsers();

  return (
    <div className="relative">
      {clickedUser !== null ? (
        <div className="h-screen flex flex-col justify-between">
          <ChatHeader />
          <ChatMain />
          <ChatInput />
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center space-y-3">
          <div className="absolute -z-10">
            <Image
              src={bgChat}
              alt="chat-illustration"
              className="opacity-20"
            />
          </div>
          <h1 className="text-4xl font-bold">Welcome to ChatApp!</h1>
          <p className="text-lg">
            Select a user to start chatting or search for someone new.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
