"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMain from "./ChatMain";
import { useUsers } from "@/contexts/usersContext";
import bgChat from "../../../public/chat.png";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

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
        <div className="h-screen flex flex-col items-center justify-center space-y-3 text-lg">
          <div className="absolute -z-10">
            <Image
              src={bgChat}
              alt="chat-illustration"
              className="opacity-20"
            />
          </div>
          <h1 className="text-4xl font-bold">Welcome to ChatApp!</h1>
          <p>Select a user to start chatting or search for someone new.</p>
          <p>or</p>
          <Dialog>
            <DialogTrigger className="text-lg bg-[#D99559] hover:bg-[#F2B441] text-[#F2E2CE] py-2 px-4 rounded-full">
              Create Room
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Room Name</DialogTitle>
                <DialogDescription className="flex flex-row space-x-2">
                  <Input placeholder="Room name..." />
                  <Button>Create</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
