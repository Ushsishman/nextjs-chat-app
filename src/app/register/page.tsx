"use client";

import RegisterForm from "@/components/form/RegisterForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";

const page = () => {
  const { userLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userLoggedIn === true) {
      router.push("/");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      {userLoggedIn === true ? <p>Loading...</p> : <RegisterForm />}
    </div>
  );
};

export default page;
