"use client";

import LoginForm from "@/components/form/LoginForm";
import { useAuth } from "@/contexts/authContext";
import { Button } from "@/components/ui/button";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userLoggedIn, currentUser } = useAuth();
  const router = useRouter();

  const signOutUser = async () => {
    signOut(auth).then(() => {
      router.refresh();
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        {userLoggedIn === true ? (
          <div>
            Hello {currentUser.email}
            <Button onClick={signOutUser}>Sign out</Button>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
