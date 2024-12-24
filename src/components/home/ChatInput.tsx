"use client";

import { Input } from "../ui/input";
import { IoMdSend } from "react-icons/io";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/dataContext";
import { useAuth } from "@/contexts/authContext";
import { sendMessageToRoom, sendMessageToGroupRoom } from "@/utils/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import MediaButton from "./MediaButton";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const ChatInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mediaFormat, setMediaFormat] = useState<"png" | "jpg" | "mp4" | null>(
    null,
  );
  const { toast } = useToast();
  const { clickedUser, currentChat, clickedRoom } = useData();
  const { currentUser } = useAuth();

  const formSchema = z.object({
    message: z.string().min(1).max(200),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const message = values.message;
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    let trimmedMessage = message.trim();

    if (trimmedMessage.length === 0 || trimmedMessage.length > 100) {
      toast({
        title: "Error",
        description:
          "Your message contains too much whitespace or is too short.",
        variant: "destructive",
      });
    } else {
      let normalizedMessage = trimmedMessage.replace(/\s+/g, " ").trim();

      if (currentChat === "userChat") {
        sendMessageToRoom(
          currentUser,
          clickedUser,
          normalizedMessage,
          file,
          mediaFormat,
          small_id,
        );

        sendMessageToRoom(currentUser, clickedUser, normalizedMessage, file, mediaFormat);
      }
      if (currentChat === "groupChat") {
        sendMessageToGroupRoom(
          currentUser,
          clickedRoom,
          normalizedMessage,
          file,
          mediaFormat,
          small_id,
          mediaFormat
        );
      }
    }

    form.reset({ message: "" });
    setFile(null);
  }

  return (
    <div className="bg-[#3E3028] h-14 p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-center">
                    <MediaButton
                      setFile={setFile}
                      file={file}
                      setMediaFormat={setMediaFormat}
                    />
                    <MediaButton setFile={setFile} file={file} setMediaFormat={setMediaFormat} />
                    <Input
                      type="text"
                      className="bg-[#F2E2CE] mx-2"
                      {...field}
                      placeholder="Type a message"
                      maxLength={200}
                    />
                    <Button type="submit">
                      <IoMdSend />
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
