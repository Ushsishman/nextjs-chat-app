"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUsers } from "@/contexts/usersContext";
import User from "../User/User";
import { Key } from "react";
import { UserData } from "@/interfaces/user";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "../ui/button";

const SidebarMain = ({ inputText }: { inputText: string }) => {
  const [currentSidebarTab, setCurrentSidebarTab] = useState<"users" | "rooms">(
    "users",
  );
  const { allUsers, setClickedUser } = useUsers();
  const { currentUser } = useAuth();

  const searchBarArr = allUsers.filter((user: UserData) => {
    if (user.uid !== currentUser.uid) {
      return user.userName.toLowerCase().includes(inputText.toLowerCase());
    }
  });

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
          <div>
            {searchBarArr.map(
              (user: UserData, index: Key | null | undefined) => (
                <div key={index}>
                  <div onClick={() => setClickedUser(user)}>
                    <User user={user} />
                  </div>
                  <Separator className="my-2" />
                </div>
              ),
            )}
          </div>
        ) : (
          <p>rooms</p>
        )}
      </div>
    </ScrollArea>
  );
};

export default SidebarMain;
