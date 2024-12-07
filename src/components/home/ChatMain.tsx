"use client";

import { useEffect } from "react";
import { useUsers } from "@/contexts/usersContext";
import { useAuth } from "@/contexts/authContext";
import { getRoomMessages } from "@/utils/utils";
import { useState } from "react";
import { MessageData } from "@/interfaces/message";
import Message from "./Message";
import { ScrollArea } from "../ui/scroll-area";

const ChatMain = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { clickedUser } = useUsers();
  const { currentUser } = useAuth();

  useEffect(() => {
    getRoomMessages(currentUser, clickedUser, setMessages, setLoading);
  }, [clickedUser]);

  return (
    <ScrollArea className="flex-1">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col my-2">
          {messages.map((message, index) => {
            return <Message key={index} message={message} />;
          })}
        </div>
      )}
    </ScrollArea>
  );
};

export default ChatMain;
