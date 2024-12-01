"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUsers } from "@/contexts/usersContext";
import User from "./User";
import { Key } from "react";

const SidebarMain = ({ inputText }: { inputText: string }) => {
  const { allUsers } = useUsers();

  const filteredArr = allUsers.filter((user: any) =>
    user.userName.toLowerCase().includes(inputText.toLowerCase()),
  );

  return (
    <ScrollArea className="flex-1 w-full rounded-md border text-[#F2E2CE]">
      <div className="p-4">
        <h4 className="mb-4 text-lg font-bold">Users</h4>
        {filteredArr.map((user: any, index: Key | null | undefined) => (
          <div key={index}>
            <User user={user} />
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SidebarMain;
