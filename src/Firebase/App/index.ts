import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { STORAGE } from "./types";
import { generateTimeStamp } from "../../config/firebase";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DATABASEURL,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const Auth = getAuth(app)

const MAIN_DIR = "media";





const utils = {
  formatDate: (timestamp: { seconds: number; }) => {
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


  createFilePAth: (conId: string, fileType: string) => {
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
      default:
        path = `${MAIN_DIR}/${conId}${STORAGE.DOC}/${generateTimeStamp()}`;
        break;
    }
    // console.log(path);

    return path;
  },
};

export default { storage, db, utils, Auth };
