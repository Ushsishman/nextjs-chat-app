"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "../ui/button";
import UsersTab from "./UsersTab";
import RoomsTab from "./RoomsTab";

const SidebarMain = ({ inputText }: { inputText: string }) => {
  const [currentSidebarTab, setCurrentSidebarTab] = useState<"users" | "rooms">(
    "users",
  );

  return (
    <ScrollArea className="flex-1 w-full rounded-md border text-[#F2E2CE]">
      <div className="p-4">
        <div className="flex flex-row justify-around items-center border-b-2 mb-2">
          <Button
            onClick={() => setCurrentSidebarTab("users")}
            className={clsx("mb-4 py-2 px-4 rounded-md text-lg font-bold", {
              underline: currentSidebarTab === "users",
            })}>
            Users
          </Button>
          <Button
            onClick={() => setCurrentSidebarTab("rooms")}
            className={clsx("mb-4 py-2 px-4 rounded-md text-lg font-bold", {
              underline: currentSidebarTab === "rooms",
            })}>
            Rooms
          </Button>
        </div>
        {currentSidebarTab === "users" ? (
          <UsersTab inputText={inputText} />
        ) : (
          <RoomsTab inputText={inputText} />
        )}
      </div>
    </ScrollArea>
  );
};

export default SidebarMain;
