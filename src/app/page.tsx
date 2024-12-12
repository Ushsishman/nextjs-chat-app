"use client";

import LoginForm from "@/components/form/LoginForm";
import { useAuth } from "@/contexts/authContext";
import HomePage from "@/components/home/HomePage";

export default function Home() {
  const { userLoggedIn } = useAuth();

  return (
    <>
      {userLoggedIn === true ? (
        <HomePage />
      ) : (
        <div className="h-screen flex items-center justify-center">
          <LoginForm />
        </div>
      )}
    </>
  );
}
