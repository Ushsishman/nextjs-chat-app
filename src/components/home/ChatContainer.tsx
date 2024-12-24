"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMain from "./ChatMain";
import { useData } from "@/contexts/dataContext";
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
import { useState } from "react";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "@/contexts/authContext";
import { UserData } from "@/interfaces/user";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuid } from "uuid";
import { useResponsive } from "@/contexts/responsiveContext";
import { FaArrowRight } from "react-icons/fa";

const ChatContainer = () => {
  const { currentChat } = useData();
  const { currentUser } = useAuth();
  const { openSidebar, setOpenSidebar } = useResponsive();
  const [roomName, setRoomName] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const createRoomHandler = async () => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);
    const roomRef = doc(db, "groupChats", small_id);

    const adminObj: UserData = {
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      userName: currentUser.userName,
      uid: currentUser.uid,
    };

    const roomSnapshot = await getDoc(roomRef);

    if (!roomSnapshot.exists()) {
      await setDoc(roomRef, {
        roomName: roomName,
        messages: [],
        members: [],
        adminId: currentUser.uid,
        roomId: small_id,
      })
        .then(async () => {
          await updateDoc(roomRef, {
            members: arrayUnion(adminObj),
          });
        })
        .then(() => {
          toast({
            title: "Success",
            description: `Your room ${roomName} successfully created!`,
            variant: "default",
          });
          setDialogOpen(false);
        });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {currentChat !== null ? (
        <div className="h-screen flex flex-col justify-between">
          <ChatHeader />
          <ChatMain />
          <ChatInput />
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center space-y-3 text-lg">
          {openSidebar === false && (
            <Button
              size="icon"
              onClick={() => setOpenSidebar(true)}
              className="absolute top-0 bottom-0 mx-0 my-auto left-2">
              <FaArrowRight />
            </Button>
          )}
          <div className="absolute -z-10">
            <Image
              src={bgChat}
              alt="chat-illustration"
              className="opacity-20"
            />
          </div>
          <h1 className="text-4xl font-bold text-center">
            Welcome to ChatApp!
          </h1>
          <p className="text-center">
            Select a user to start chatting or search for someone new.
          </p>
          <p>or</p>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="text-lg bg-[#D99559] hover:bg-[#F2B441] text-[#F2E2CE] py-2 px-4 rounded-full">
              Create Room
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Room Name</DialogTitle>
                <DialogDescription>
                  <Input
                    placeholder="Room name..."
                    onChange={(e) => setRoomName(e.target.value)}
                    min={1}
                    max={20}
                  />
                </DialogDescription>
              </DialogHeader>
              <Button onClick={createRoomHandler}>Create</Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
