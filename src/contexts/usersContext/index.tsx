"use client";

import React, { useContext, useState, useEffect, createContext } from "react";
import { db } from "../../../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";

const UsersContext = createContext<any>(null);

const useUsers = () => {
  return useContext(UsersContext);
};

const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [allUsers, setAllUsers] = useState<object[]>([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const usersArr: object[] = [];

        querySnapshot.forEach((doc) => {
          usersArr.push(doc.data());
        });

        setAllUsers(usersArr);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  const value: any = {
    allUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export { UsersProvider, useUsers };
