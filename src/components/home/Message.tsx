"use client";

import { MessageData } from "@/interfaces/message";
import clsx from "clsx";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { getMedia } from "@/utils/utils";
import Image from "next/image";
import ReactPlayer from "react-player";
import { db } from "../../../firebaseConfig";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { useData } from "@/contexts/dataContext";
import { UserData } from "@/interfaces/user";
import { BiCheckDouble } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";

const Message = ({ message }: { message: MessageData }) => {
  const [media, setMedia] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedSendername, setCheckedSendername] = useState<string>(message.senderName);
  const [everyoneSeen, setEveryoneSeen] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { currentChat } = useData();

  const handleReadBy = async () => {
    if (currentUser.uid === message.senderId) return;

    if (currentChat === "groupChat") {
      const groupRef = doc(db, "groupChats", message.roomId);
      const groupDoc = await getDoc(groupRef);
      if (!groupDoc.exists()) return;

      const members = groupDoc.data().members || [];
      const isMember = members.find((member: UserData) => member.uid === currentUser.uid);
      if (!isMember) return;

      const messages = groupDoc.data().messages || [];
      const updatedMessages = messages.map((msg: MessageData) => {
        if (msg.messageId === message.messageId) {
          const readBy = msg.readBy || [];
          if (!readBy.includes(currentUser.uid)) {
            return {
              ...msg,
              readBy: [...readBy, currentUser.uid]
            };
          }
        }
        return msg;
      });

      if (JSON.stringify(messages) !== JSON.stringify(updatedMessages)) {
        await updateDoc(groupRef, { messages: updatedMessages });
      }
    } else if (currentChat === "userChat") {
      const chatRef = doc(db, "chats", message.roomId);
      const chatDoc = await getDoc(chatRef);
      if (!chatDoc.exists()) return;

      const messages = chatDoc.data().messages || [];
      const updatedMessages = messages.map((msg: MessageData) => {
        if (msg.messageId === message.messageId) {
          const readBy = msg.readBy || [];
          if (!readBy.includes(currentUser.uid)) {
            return {
              ...msg,
              readBy: [...readBy, currentUser.uid]
            };
          }
        }
        return msg;
      });

      if (JSON.stringify(messages) !== JSON.stringify(updatedMessages)) {
        await updateDoc(chatRef, { messages: updatedMessages });
      }
    }
  };

  useEffect(() => {
    if (currentUser && message && !message.readBy?.includes(currentUser.uid)) {
      handleReadBy();
    }
  }, [currentUser, message]);

  const date = message.timeStamp.toDate();
  const shortTime = date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleReceipts = async () => {
    if (currentChat === "userChat") {
      if (message.readBy?.length === 1) {
        setEveryoneSeen(true);
      }

    }

    if (currentChat === "groupChat") {
      const currentRoomRef = doc(db, "groupChats", `${message.roomId}`);
      const currentRoomDoc = await getDoc(currentRoomRef);

      if (currentRoomDoc.exists()) {
        const members = currentRoomDoc.data().members;

        if (members.length - 1 === message.readBy?.length) {
          setEveryoneSeen(true);
        }

      }
    }
  };

  useEffect(() => {
    handleReceipts();
  }, [message.readBy?.length]);

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
        <div className="flex items-center space-x-1">
          <p
            className={clsx(
              "text-xs",
              currentUser.uid === message.senderId
                ? "text-[#D9C7AE]"
                : "text-[#B9A890]",
            )}>
            {shortTime}
          </p>
          {currentUser.uid === message.senderId && (
            <span className={clsx("text-xs", everyoneSeen ? "text-emerald-300" : "text-slate-200")}>
              {everyoneSeen ? <BiCheckDouble size={20} /> : <BiCheck size={20} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
