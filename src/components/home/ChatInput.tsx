"use client";

import { Input } from "../ui/input";
import { IoMdSend } from "react-icons/io";
import { Button } from "../ui/button";
import { useState } from "react";

const ChatInput = () => {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="bg-[#3E3028] h-14 p-2 flex flex-row items-center">
      <Input
        type="text"
        className="bg-[#F2E2CE] mr-2"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <Button>
        <IoMdSend />
      </Button>
    </div>
  );
};

export default ChatInput;
