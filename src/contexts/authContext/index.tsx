"use client";

import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext<any>(null);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return unsubscribe;
  }, []);

  async function initializeUser(user: any) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value: any = {
    userLoggedIn,
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading === true ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
