"use client";

import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reRender, setRerender] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
 
    return unsubscribe;
  }, [reRender]);

  async function initializeUser(user: any) {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setCurrentUser(userData);
        setUserLoggedIn(true);
        setRerender(false);
      }
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value: any = {
    userLoggedIn,
    currentUser,
    setRerender,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading === true ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
