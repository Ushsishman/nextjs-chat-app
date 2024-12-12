"use client";

import { MessageData } from "@/interfaces/message";
import clsx from "clsx";
import { useAuth } from "@/contexts/authContext";

const Message = ({ message }: { message: MessageData }) => {
  const { currentUser } = useAuth();
  const date = message.timeStamp.toDate();
  const shortTime = date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={clsx("mx-6 my-1 text-[#F2E2CE]", {
        "flex justify-end": currentUser.uid === message.senderId,
        "flex justify-start": currentUser.uid !== message.senderId,
      })}>
      <div
        className={clsx(
          "flex flex-row items-end space-x-2 py-1 px-2",
          currentUser.uid === message.senderId
            ? "bg-[#D99559] rounded-lg"
            : "bg-[#735645] rounded-lg",
        )}>
        <p className="text-lg">{message.senderName}:</p>
        <p className="text-lg">{message.content}</p>
        <p
          className={clsx(
            "text-xs",
            currentUser.uid === message.senderId
              ? "text-[#D9C7AE]"
              : "text-[#B9A890]",
          )}>
          {shortTime}
        </p>
      </div>
    </div>
  );
};

export default Message;
