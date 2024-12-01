"use client";

import SidebarHeader from "@/components/sidebar/SidebarHeader";
import SidebarMain from "@/components/sidebar/SidebarMain";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Sidebar = () => {
  const [inputText, setInputText] = useState<string>("");

  return (
    <div className="h-screen w-full flex flex-col p-3">
      <SidebarHeader />
      <Input
        type="text"
        placeholder="Search..."
        className="bg-[#F2E2CE] my-2"
        onChange={(e) => setInputText(e.currentTarget.value)}
      />
      <SidebarMain inputText={inputText} />
    </div>
  );
};

export default Sidebar;
