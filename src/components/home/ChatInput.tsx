"use client";

import { Input } from "../ui/input";
import { IoMdSend } from "react-icons/io";
import { Button } from "../ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUsers } from "@/contexts/usersContext";
import { useAuth } from "@/contexts/authContext";
import { sendMessageToRoom } from "@/utils/utils";

const ChatInput = () => {
  const [message, setMessage] = useState<string>("");

  const { toast } = useToast();
  const { clickedUser } = useUsers();
  const { currentUser } = useAuth();

  const handleMessage = (message: string) => {
    let trimmedMessage = message.trim();

    if (trimmedMessage.length === 0 || trimmedMessage.length > 100) {
      toast({
        title: "Error",
        description:
          "Your message contains too much whitespace or is too short.",
        variant: "destructive",
      });
    } else {
      let normalizedMessage = trimmedMessage.replace(/\s+/g, " ").trim();
      sendMessageToRoom(currentUser, clickedUser, normalizedMessage);
    }

    setMessage("");
  };

  return (
    <div className="bg-[#3E3028] h-14 p-2 flex flex-row items-center">
      <Input
        type="text"
        className="bg-[#F2E2CE] mr-2"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Type a message"
        maxLength={200}
      />
      <Button onClick={() => handleMessage(message)}>
        <IoMdSend />
      </Button>
    </div>
  );
};

export default ChatInput;
