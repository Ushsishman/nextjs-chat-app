"use client";

import { useEffect } from "react";
import { useData } from "@/contexts/dataContext";
import { useAuth } from "@/contexts/authContext";
import { getRoomMessages, getChatRoomMessages } from "@/utils/utils";
import { useState } from "react";
import { MessageData } from "@/interfaces/message";
import Message from "./Message";
import { ScrollArea } from "../ui/scroll-area";

const ChatMain = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { clickedUser, currentChat, clickedRoom } = useData();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentChat === "userChat") {
      getRoomMessages(currentUser, clickedUser, setMessages, setLoading);
    }
    if (currentChat === "groupChat") {
      getChatRoomMessages(clickedRoom, setMessages, setLoading);
    }
  }, [clickedUser, clickedRoom, currentChat]);

  return (
    <ScrollArea className="flex-1">
      {currentChat === "userChat" && (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col my-2">
              {messages.map((message, index) => {
                return <Message key={index} message={message} />;
              })}
            </div>
          )}
        </>
      )}
      {currentChat === "groupChat" && (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col my-2">
              {messages.map((message, index) => {
                return <Message key={index} message={message} />;
              })}
            </div>
          )}
        </>
      )}
    </ScrollArea>
  );
};

export default ChatMain;
