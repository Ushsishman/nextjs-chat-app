import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserData } from "@/interfaces/user";
import { RoomData } from "@/interfaces/room";

const createChatId = (currentUser: UserData, clickedUser: UserData) => {
  let chatUsers = [];
  chatUsers.push(currentUser.uid, clickedUser.uid);
  const sortedUsers = chatUsers.sort();
  const chatId = `${sortedUsers[0]}_${sortedUsers[1]}`;

  return chatId;
};

const sendMessageToRoom = async (
  currentUser: UserData,
  clickedUser: UserData,
  message: string,
) => {
  const chatId = createChatId(currentUser, clickedUser);

  const chatRef = doc(db, "chats", chatId);
  const chatSnapshot = await getDoc(chatRef);
  const messageObj = {
    senderId: currentUser.uid,
    senderName: currentUser.userName,
    timeStamp: new Date(),
    content: message,
  };

  if (!chatSnapshot.exists()) {
    await setDoc(chatRef, { messages: arrayUnion(messageObj) });
  } else {
    await updateDoc(chatRef, { messages: arrayUnion(messageObj) });
  }
};
const sendMessageToGroupRoom = async (
  currentUser: UserData,
  clickedRoom: RoomData,
  message: string,
) => {
  const chatRef = doc(db, "groupChats", `${clickedRoom.roomId}`);
  const chatSnapshot = await getDoc(chatRef);
  const messageObj = {
    senderId: currentUser.uid,
    senderName: currentUser.userName,
    timeStamp: new Date(),
    content: message,
  };
  
  if (!chatSnapshot.exists()) {
    await setDoc(chatRef, { messages: arrayUnion(messageObj) });
  } else {
    await updateDoc(chatRef, { messages: arrayUnion(messageObj) });
  }
};

const getRoomMessages = (
  currentUser: UserData,
  clickedUser: UserData,
  setMessages: any,
  setLoading: any,
) => {
  const chatId = createChatId(currentUser, clickedUser);
  const messagesRef = doc(db, "chats", chatId);

  const unsub = onSnapshot(messagesRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data() as any;
      setMessages(data.messages);
      setLoading(false);
    } else {
      setMessages([]);
      setLoading(false);
    }
  });
};

const getChatRoomMessages = (
  clickedRoom: RoomData,
  setMessages: any,
  setLoading: any,
) => {
  const roomRef = doc(db, "groupChats", `${clickedRoom.roomId}`);

  const unsub = onSnapshot(roomRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data() as any;
      setMessages(data.messages);
      setLoading(false);
    } else {
      setMessages([]);
      setLoading(false);
    }
  });
};

export { sendMessageToRoom, getRoomMessages, getChatRoomMessages,sendMessageToGroupRoom };
