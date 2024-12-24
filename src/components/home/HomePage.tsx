"use client";

import { DataProvider } from "@/contexts/dataContext";
import Sidebar from "@/layouts/Sidebar";
import ChatContainer from "./ChatContainer";
import { useResponsive } from "@/contexts/responsiveContext";
import clsx from "clsx";

const HomePage = () => {
  const { openSidebar } = useResponsive();

  return (
    <DataProvider>
      <div className="h-screen w-full md:grid md:grid-cols-8">
        <div
          className={clsx(
            "absolute z-10 w-full md:static md:col-span-3 lg:col-span-2 bg-[#735645]",
            openSidebar === false ? "hidden" : "block",
          )}>
          <Sidebar />
        </div>
        <div
          className={clsx(
            openSidebar === false ? "md:col-span-8" : "md:col-span-5 lg:col-span-6",
          )}>
          <ChatContainer />
        </div>
      </div>
    </DataProvider>
  );
};

export default HomePage;
