"use client";

import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { UserData } from "@/interfaces/user";

const User = ({ user }: { user: UserData }) => {
  return (
    <div className="p-2 pr-3 flex flex-row items-center rounded-full hover:bg-[#F2E2CE] hover:text-[#735645] cursor-pointer">
      <div className="mr-2">
        {user.photoURL === null ? (
          <FaCircleUser size="40" />
        ) : (
          <Image
            src={user.photoURL}
            width={40}
            height={40}
            alt="profile img"
            className="rounded-full"
          />
        )}
      </div>
      <p className="font-bold">{user.userName}</p>
    </div>
  );
};

export default User;
