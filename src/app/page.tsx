"use client";

import LoginForm from "@/components/form/LoginForm";
import { useAuth } from "@/contexts/authContext";

export default function Home() {
  const { userLoggedIn, currentUser } = useAuth();

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        {userLoggedIn === true ? (
          <div>Hello {currentUser.email}</div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
