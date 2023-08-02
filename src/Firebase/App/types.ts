import { DocumentData, DocumentReference } from "firebase/firestore";

export enum COLLECTION {
    USER = "Users",
    BOOKS = "Books",
}

export enum STORAGE {
    IMAGE = `/image`,
    VIDEO = `/video`,
    AUDIO = `/audio`,
    DOC = `/doc`,
}

export interface UsersFirebase {
    userId?: string;
    name: string;
    email: string;
    avatarUrl: string;
}

export type singleRef = DocumentReference<DocumentData>;

