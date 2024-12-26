import { UserData } from "./user";
import { MessageData } from "./message";

export interface RoomData {
    adminId?: string;
    roomName: string;
    members?: UserData[];
    messages?: MessageData[];
    roomId?: string;
}