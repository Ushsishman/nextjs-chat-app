"use client";

import { Key } from "react";
import { Separator } from "../ui/separator";
import { RoomData } from "@/interfaces/room";
import Room from "../Room/Room";
import { useData } from "@/contexts/dataContext";
import { useResponsive } from "@/contexts/responsiveContext";

const RoomsTab = ({ inputText }: { inputText: string }) => {
  const { setClickedRoom, allChatGroups, setCurrentChat } = useData();
  const { setOpenSidebar } = useResponsive();

  const searchBarArr = allChatGroups.filter((room: RoomData) => {
    return room.roomName?.toLowerCase().includes(inputText.toLowerCase());
  });

  return (
    <div>
      {searchBarArr.map((room: RoomData, index: Key | null | undefined) => {
        return (
          <div key={index}>
            <div
              onClick={() => {
                setCurrentChat("groupChat");
                setClickedRoom(room);
                setOpenSidebar(false);
              }}>
              <Room room={room} />
            </div>
            <Separator className="my-2" />
          </div>
        );
      })}
    </div>
  );
};

export default RoomsTab;
