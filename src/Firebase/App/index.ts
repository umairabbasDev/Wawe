import { ALLOW_DOCS } from "@config/config";
import { generateTimeStamp } from "@utils/index";
import { initializeApp } from "firebase/app";
import {
  DocumentData,
  DocumentReference,
  getFirestore,
} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Get a messaging instance
const messaging = getMessaging(app);

export const COLLECTION = {
  USER: "Users",
  MESSAGE: "Messages",
  CONVERSATION: "Conversations",
};
const MAIN_DIR = "chat-media";
export const STORAGE = {
  IMAGE: `/image`,
  VIDEO: `/video`,
  AUDIO: `/audio`,
  DOC: `/doc`,
};

// ***************************************************************** user *****************************************************************

export interface UsersFirebase {
  userId: any;
  name: string;
  email: string;
  avatarUrl: string;
  mobileNo: number | string;
  online: boolean;
}

export type singleRef = DocumentReference<DocumentData>;

export interface Conversations {
  id?: string;
  lastMessage: singleRef;
  participants: singleRef[];
}

export enum MessageType {
  "text",
  "image",
  "video",
  "audio",
  "document",
  "emoji",
  "card"
}
export interface Message {
  id: string;
  conversationId: any;
  senderUid: any;
  recipientUid: any;
  messageType: MessageType;
  messageData: string;
  readBy: [] | null;
  createdAt: any;
  status?: string;
}

const utils = {
  formatDate: (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = hours % 12 || 12;
    const time = `${twelveHourFormat}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return { date, time };
  },

  createFilePAth: (conId: string, fileType: any) => {
    let path = "";
    switch (true) {
      case fileType.includes("image"):
        path = `${MAIN_DIR}/${conId}${STORAGE.IMAGE}/${generateTimeStamp()}`;
        break;
      case fileType.includes("video"):
        path = `${MAIN_DIR}/${conId}${STORAGE.VIDEO}/${generateTimeStamp()}`;
        break;
      case fileType.includes("audio"):
        path = `${MAIN_DIR}/${conId}${STORAGE.AUDIO}/${generateTimeStamp()}`;
        break;
      // case fileType.includes(ALLOW_DOCS):
      //   path = `${MAIN_DIR}/${conId}${STORAGE.DOC}/${generateTimeStamp()}`;
      //   break;
      default:
        path = `${MAIN_DIR}/${conId}${STORAGE.DOC}/${generateTimeStamp()}`;
        break;
    }
    // console.log(path);

    return path;
  },
};

export default { storage, db, messaging, MessageType, utils };
