"use client";

import { Separator } from "@/components/ui/separator";
import { useData } from "@/contexts/dataContext";
import User from "../User/User";
import { Key } from "react";
import { UserData } from "@/interfaces/user";
import { useAuth } from "@/contexts/authContext";

const UsersTab = ({ inputText }: { inputText: string }) => {
  const { allUsers, setClickedUser, setCurrentChat } = useData();
  const { currentUser } = useAuth();

  const searchBarArr = allUsers.filter((user: UserData) => {
    if (user.uid !== currentUser.uid) {
      return user.userName.toLowerCase().includes(inputText.toLowerCase());
    }
  });

  return (
    <div>
      {searchBarArr.map((user: UserData, index: Key | null | undefined) => (
        <div key={index}>
          <div
            onClick={() => {
              setCurrentChat("userChat");
              setClickedUser(user);
            }}>
            <User user={user} />
          </div>
          <Separator className="my-2" />
        </div>
      ))}
    </div>
  );
};

export default UsersTab;
