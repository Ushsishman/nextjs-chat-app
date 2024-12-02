"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUsers } from "@/contexts/usersContext";
import User from "../User/User";
import { Key } from "react";
import { UserData } from "@/interfaces/user";
import { useAuth } from "@/contexts/authContext";

const SidebarMain = ({ inputText }: { inputText: string }) => {
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
        <h4 className="mb-4 text-lg font-bold">Users</h4>
        {searchBarArr.map((user: UserData, index: Key | null | undefined) => (
          <div key={index}>
            <div onClick={() => setClickedUser(user)}>
              <User user={user} />
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SidebarMain;
