"use client";

import { MessageData } from "@/interfaces/message";
import clsx from "clsx";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { getMedia } from "@/utils/utils";
import Image from "next/image";
import ReactPlayer from "react-player";

const Message = ({ message }: { message: MessageData }) => {
  const [media, setMedia] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedSendername, setCheckedSendername] = useState<string>(
    message.senderName,
  );

  const { currentUser } = useAuth();

  const date = message.timeStamp.toDate();
  const shortTime = date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    getMedia(message.mediaName, setMedia, setLoading);
  }, []);

  useEffect(() => {
    if (checkedSendername.length > 8) {
      let shortenedName = checkedSendername.substring(0, 8) + "...";
      setCheckedSendername(shortenedName);
    } else {
      setCheckedSendername(message.senderName);
    }
  }, []);

  const imageFormat =
    message.mediaFormat == "jpg" || message.mediaFormat == "png";
  const videoFormat = message.mediaFormat == "mp4";

  return (
    <div
      className={clsx("mx-6 my-1 text-[#F2E2CE] space-y-1", {
        "flex flex-col items-end": currentUser.uid === message.senderId,
        "flex flex-col items-start": currentUser.uid !== message.senderId,
      })}>
      {loading === false && (
        <>
          {media !== null && (
            <div
              className={clsx(
                "rounded-lg p-2",
                currentUser.uid === message.senderId
                  ? "bg-[#D99559]"
                  : "bg-[#735645]",
              )}>
              {imageFormat && (
                <Image height={200} width={200} src={`${media}`} alt="image" />
              )}
              {videoFormat && (
                <ReactPlayer
                  controls={true}
                  url={media}
                  width={200}
                  height={200}
                />
              )}
            </div>
          )}
        </>
      )}
      <div
        className={clsx(
          "flex flex-row items-end space-x-2 py-1 px-2 rounded-lg",
          currentUser.uid === message.senderId
            ? "bg-[#D99559]"
            : "bg-[#735645]",
        )}>
        <p className="text-lg">{checkedSendername}:</p>
        <p className="text-lg max-w-60 break-words">{message.content}</p>
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
