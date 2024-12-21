"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon } from "lucide-react";
import { MdOutlinePermMedia } from "react-icons/md";
import { useEffect } from "react";

const MediaButton = ({ setFile, file, setMediaFormat }: any) => {
  const { toast } = useToast();

  useEffect(() => {
    if (file !== null)
      toast({
        title: "Success",
        description: `You picked media: ${file?.name}`,
        variant: "default",
      });
  }, [file]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" className="rounded-full">
          <PlusIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex flex-row items-center bg-[#F2E2CE] shadow shadow-black">
        <MdOutlinePermMedia color="#735645" />
        <Input
          className="border border-[#D99559] bg-[#F9F5F1] ml-2 cursor-pointer"
          type="file"
          onChange={(e) => {
            if (e.target.files !== null) {
              let fileExtension = e.target.files[0].name.split(".").pop();
              const imageFormat =
                fileExtension == "jpg" || fileExtension == "png";
              const videoFormat = fileExtension == "mp4";

              if (e.target.files[0].size < 52428800) {
                if (imageFormat || videoFormat) {
                  setFile(e.target.files[0]);
                  setMediaFormat(fileExtension);
                } else {
                  toast({
                    title: "Error",
                    description: "Only video or image format.",
                    variant: "destructive",
                  });
                }
              } else {
                toast({
                  title: "Error",
                  description: "Your file is over 50 mb.",
                  variant: "destructive",
                });
              }
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default MediaButton;
