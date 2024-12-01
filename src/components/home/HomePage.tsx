"use client";

import { UsersProvider } from "@/contexts/usersContext";
import Sidebar from "@/layouts/Sidebar";
import ChatContainer from "./ChatContainer";

const HomePage = () => {
  return (
    <UsersProvider>
      <div className="h-screen w-full grid grid-cols-4">
        <div className="col-span-1 bg-[#735645]">
          <Sidebar />
        </div>
        <div className="col-span-3">
          <ChatContainer />
        </div>
      </div>
    </UsersProvider>
  );
};

export default HomePage;
