"use client";

import React, { useContext, useState, useEffect, createContext } from "react";
import { db } from "../../../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { UserData } from "@/interfaces/user";
import { RoomData } from "@/interfaces/room";

const DataContext = createContext<any>(null);

const useData = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [allUsers, setAllUsers] = useState<object[]>([]);
  const [clickedUser, setClickedUser] = useState<UserData | null>(null);
  const [allChatGroups, setAllChatGroups] = useState<object[]>([]);
  const [clickedRoom, setClickedRoom] = useState<RoomData | null>(null);
  const [currentChat, setCurrentChat] = useState<
    null | "userChat" | "groupChat"
  >(null);

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

  useEffect(() => {
    const q = query(collection(db, "groupChats"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const roomsArr: object[] = [];

        querySnapshot.forEach((doc) => {
          roomsArr.push(doc.data());
        });

        setAllChatGroups(roomsArr);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  const value: any = {
    allUsers,
    allChatGroups,
    clickedUser,
    setClickedUser,
    clickedRoom,
    setClickedRoom,
    currentChat,
    setCurrentChat,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataProvider, useData };
