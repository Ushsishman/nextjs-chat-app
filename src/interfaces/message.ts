import { Timestamp } from "firebase/firestore";

export interface MessageData {
  content: string;
  senderId: string;
  senderName: string;
  timeStamp: Timestamp;
  mediaName: string | null;
  mediaFormat: "jpg" | "png" |"mp4" | null;
  messageId: string;
}
