"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebaseConfig";
import { LogOut } from "lucide-react";
import User from "../User/User";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const SidebarHeader = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>("");
  const [newUrl, setNewUrl] = useState<string>("");

  const router = useRouter();
  const { currentUser, setRerender } = useAuth();
  const { toast } = useToast();
  const userRef = doc(db, "users", currentUser.uid);

  const signOutUser = async () => {
    signOut(auth).then(() => {
      router.refresh();
    });
  };

  const updateUsername = async () => {
    if (newNickname.length > 0) {
      await updateDoc(userRef, {
        userName: newNickname,
      }).then(() => {
        toast({
          title: "Updated",
          description: `Your username updated.`,
          variant: "default",
        });
        setRerender(true);
        setNewNickname("");
      });
    }
  };

  const updateImage = async () => {
    if (newUrl.length > 0) {
      await updateDoc(userRef, {
        photoURL: newUrl,
      }).then(() => {
        toast({
          title: "Updated",
          description: `Your profile image updated.`,
          variant: "default",
        });
        setRerender(true);
        setNewUrl("");
      });
    }
  };

  return (
    <div className="flex flex-row justify-between items-center text-[#F2E2CE]">
      <div onClick={() => setDialogOpen(true)}>
        <User user={currentUser} />
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Update your username or/and profile image
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row space-x-2">
            <Input
              type="text"
              placeholder="New username..."
              onChange={(e) => setNewNickname(e.target.value)}
              value={newNickname}
            />
            <Button onClick={updateUsername}>Update</Button>
          </div>
          <div className="flex flex-row space-x-2">
            <Input
              type="url"
              placeholder="New profile img url..."
              onChange={(e) => setNewUrl(e.target.value)}
              value={newUrl}
            />
            <Button onClick={updateImage}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button onClick={signOutUser}>
        <LogOut />
      </Button>
    </div>
  );
};
export default SidebarHeader;
