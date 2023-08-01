import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FIREBASE, { COLLECTION, singleRef, Message, MessageType } from "../App";

export const initialMessageState: Message = {
  id: "",
  conversationId: "",
  senderUid: "",
  recipientUid: "",
  messageType: MessageType.text,
  messageData: "",
  readBy: null,
  createdAt: new Date(),
};

let messageStructure = {
  senderUid: {},
  readBy: null,
  createdAt: { seconds: 1677873671, nanoseconds: 668000000 },
  messageData: "hello mubeen",
  recipientUid: {},
  conversationId: {},
};
// Function to fetch an array of documents based on an array of document references
async function fetchDocumentsByArrayReferences<T>(
  references: Array<any>
): Promise<Array<T>> {
  const documents: Array<any> = [];

  for (const reference of references) {
    const document = await getDoc(reference);
    if (document.exists()) {
      documents.push(document.data());
    }
  }

  return documents;
}

async function updateDocumentField(
  collectionPath: string,
  documentId: string,
  { key, value }: { key: string; value: unknown }
) {
  const documentRef = doc(FIREBASE.db, collectionPath, documentId);

  try {
    const res: unknown = await updateDoc(documentRef, { [key]: value });
    // console.log(
    //   `Field "${key}" updated successfully for document ${documentId}`
    // );
    return res;
  } catch (error) {
    throw new Error(
      `Error updating field "${key}" for document ${documentId}: `,
      error
    );
    // console.error(
    //   `Error updating field "${key}" for document ${documentId}: `,
    //   error
    // );
  }
}

async function doesDocumentExist(collectionPath: string, documentId: string) {
  // TODO:
  /**
   * need to add check if documentId is singleRef type or id
   *
   * if (typeof(documentId) === singleRef ) {} else {}
   */

  const documentRef = doc(FIREBASE.db, collectionPath, documentId);

  const documentSnapshot = await getDoc(documentRef);

  return documentSnapshot.exists();
}

async function createDocument(data: any, collectionName: string) {
  try {
    const docRef = await addDoc(collection(FIREBASE?.db, collectionName), {
      ...data,
      createdAt: new Date(),
    });

    // console.log("Document written with ID: ", docRef);
    return docRef;
  } catch (e) {
    throw new Error("Error adding document: ", e);
  }
}

async function createDocumentWithCustomID(
  data: any,
  collectionName: string,
  docId: string
) {
  try {
    const docRef = doc(FIREBASE?.db, collectionName, docId);

    const isExist = await doesDocumentExist(collectionName, docId);
    if (isExist) {
      return { isExist, message: "Document already exist" };
    }
    await setDoc(docRef, {
      ...data,
      createdAt: new Date(),
    });
    // console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    throw new Error("Error adding document: ", e);
  }
}

async function getDocumentByRef(ref: singleRef) {
  try {
    const doc = await getDoc(ref);
    if (doc.exists()) {
      return { id: doc.id, ref: doc.ref, ...doc.data() };
    } else {
      console.warn("No such document exists!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}

async function parasDocuments(rawData, userRef: any) {
  const docPromises = rawData.map(async (doc) => {
    const lastMessageRef = doc.data().lastMessage;
    const filteredArray = doc
      .data()
      .participants.filter((ref) => ref?.path !== userRef?.path);
    const remainingParticipants = filteredArray[0];
    let participant = await getDocumentByRef(remainingParticipants);

    if (lastMessageRef) {
      let lastMessage: any = await getDocumentByRef(lastMessageRef);
      if (lastMessage && lastMessage.senderUid?.path === userRef?.path) {
        lastMessage = {
          ...lastMessage,
          recipientUid: participant,
          senderUid: null,
        };
      }
      if (lastMessage && lastMessage.recipientUid?.path === userRef?.path) {
        lastMessage = {
          ...lastMessage,
          senderUid: participant,
          recipientUid: null,
        };
      }
      return { id: doc.id, lastMessage, participant };
    } else {
      return { id: doc.id, lastMessage: initialMessageState, participant };
    }
  });

  return await Promise.all(docPromises);
}

async function parasMessageDocuments(rawData, userRef: singleRef) {
  try {
    const isLoggedInUser = rawData.senderUid?.path == userRef?.path;
    // console.log();

    const time = FIREBASE.utils.formatDate(rawData.createdAt);
    const singleMsg = {
      ...rawData,
      createdAt: time,
    };
    // console.log("isLoggedInUser :", isLoggedInUser);

    if (isLoggedInUser) {
      singleMsg.recipientUid = true;
      singleMsg.senderUid = false;
    } else {
      singleMsg.recipientUid = false;
      singleMsg.senderUid = true;
    }
    // console.log("from firebase lib :", singleMsg);

    return singleMsg;
  } catch (error) {
    throw new Error("Message data parsing Error : ", error);
  }
}

async function getDocumentsByArrayFieldValue(
  { key, value }: any,
  collectionName: string
) {
  try {
    // const MobNumber = value.split("/")[1];
    const userRef = doc(FIREBASE.db, value);
    const q = query(
      collection(FIREBASE.db, collectionName),
      where(key, "array-contains", userRef)
    );
    const querySnapshot = await getDocs(q);

    const documents = await parasDocuments(querySnapshot.docs, userRef);

    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return null;
  }
}

async function getMessagesByConversationId(conversationId) {
  try {
    const messages = [];

    const q = query(
      collection(FIREBASE.db, COLLECTION.MESSAGE),
      where("conversationId", "==", conversationId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });

    return messages;
  } catch (error) {
    console.error("Error getting messages by conversation ID:", error);
    return null;
  }
}

// Upload file to Firebase Storage
async function uploadStorageFile(conID, fileData) {
  try {
    // console.log(fileData);
    const filePath = FIREBASE.utils.createFilePAth(conID, fileData.type);
    // console.log("filePath", filePath);
    const storageRef = ref(FIREBASE.storage, filePath);

    const uploadSuccess = await uploadBytes(storageRef, fileData);
    if (uploadSuccess) {
      const downloadURL = await getDownloadURL(ref(FIREBASE.storage, filePath));
      // console.log("File uploaded successfully");
      return { success: true, url: downloadURL };
    } else {
      console.info("please check the File: lib");
    }
  } catch (error) {
    throw new Error("Error uploading file: ", error);
  }
}

async function deleteDocument(docId: string, collectionName: string) {
  try {
    await deleteDoc(doc(FIREBASE.db, collectionName, docId));
    // console.log("Document with ID", docId, "deleted successfully");
  } catch (e) {
    throw new Error("Error deleting document: ", e);
  }
}

async function getFCMToken() {
  try {
    const currentToken = await getToken(FIREBASE.messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });

    if (currentToken) {
      // console.log("FCM token:", currentToken);
      return currentToken;
    } else {
      console.info(
        "No registration token available. Request permission to generate one."
      );
      return false;
    }
  } catch (err) {
    throw new Error("Error getting FCM token", err);
  }
  // const token = getToken(FIREBASE.messaging, {
  //   vapidKey:
  //     "BFsXzXltCDEZ4G9nr2dxIqLhNHBkuME9y2zLGot4Uq-DNsbPP4UWsWyrnzz5Al8KmUk_lDNXf7FnNGTC94K3yus",
  //   // vapidKey: import.meta.env.VITE_VAPID_KEY,
  // });
}

// push notifications custom functions

export const getOrRegisterServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    return window.navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope")
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/firebase-push-notification-scope",
          }
        );
      });
  }
  throw new Error("The browser doesn`t support service worker.");
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
    getToken(FIREBASE.messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
      serviceWorkerRegistration,
    })
  );

export const onForegroundMessage = () =>
  new Promise((resolve) =>
    onMessage(FIREBASE.messaging, (payload) => resolve(payload))
  );

export {
  createDocument,
  createDocumentWithCustomID,
  getDocumentsByArrayFieldValue,
  fetchDocumentsByArrayReferences,
  parasDocuments,
  getMessagesByConversationId,
  updateDocumentField,
  parasMessageDocuments,
  uploadStorageFile,
  deleteDocument,
  getFCMToken,
};
