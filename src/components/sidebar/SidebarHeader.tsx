"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebaseConfig";
import { LogOut } from "lucide-react";
import User from "./User";

const SidebarHeader = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const signOutUser = async () => {
    signOut(auth).then(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-row justify-between items-center text-[#F2E2CE]">
      <User user={currentUser} />
      <div>
        <Button onClick={signOutUser}>
          <LogOut />
        </Button>
      </div>
    </div>
  );
};
export default SidebarHeader;
