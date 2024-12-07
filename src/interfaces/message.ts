import { Timestamp } from "firebase/firestore";

export interface MessageData {
  content: string;
  senderId: string;
  timeStamp: Timestamp;
}
