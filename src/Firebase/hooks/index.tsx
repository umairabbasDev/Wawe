import { loggedInUserProfile } from "@reducer/authReducer";
// import { updateRoom, updateActiveMessageList } from "@reducer/chatReducer";
import { updateActiveMessageList } from "@reducer/chatReducer";
import { AppDispatch } from "@store";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FIREBASE, { Conversations, COLLECTION, Message } from "../App";
import { parasDocuments, parasMessageDocuments } from "../lib";

// Set up real-time listener for "Conversations" collection

// export const useConversations = (number: any) => {
//   const [conversations, setConversations] = useState<Conversations[]>([]);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     // console.log("start hook : ", number);

//     let qData = { key: "participants", value: number };

//     const userRef = doc(FIREBASE?.db, COLLECTION.USER, qData?.value);

//     const q = query(
//       collection(FIREBASE.db, COLLECTION.CONVERSATION),
//       where(qData?.key, "array-contains", userRef)
//     );

//     const unsubscribe = onSnapshot(q, async (snapshot: QuerySnapshot) => {
//       //   console.log("snapshot hook  : ", snapshot.docs);

//       const updatedConversations: Conversations[] = await parasDocuments(
//         snapshot.docs,
//         userRef
//       );
//       dispatch(updateRoom(updatedConversations));
//       setConversations(updatedConversations);
//     });

//     // Clean up listener when component unmounts
//     return () => unsubscribe();
//   }, []);

//   return conversations;
// };

export const useMessages = (conversationId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { mobileNo } = useSelector(loggedInUserProfile);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (conversationId) {
      // console.log("start hook : ", conversationId);
      let qData = { key: "conversationId", value: conversationId };
      const conversationRef = doc(
        FIREBASE.db,
        COLLECTION.CONVERSATION,
        qData?.value
      );

      const messagesQuery = query(
        collection(FIREBASE.db, COLLECTION.MESSAGE),
        where(qData.key, "==", conversationRef)
      );

      const userRef = doc(FIREBASE.db, `${COLLECTION.USER}/${mobileNo}`);

      const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
        const messages = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Message)
        );
        const updatedMessages = await Promise.all(
          messages.map(async (message) =>
            parasMessageDocuments(message, userRef)
          )
        );

        updatedMessages.sort((a, b) => a.createdAt?.date - b.createdAt?.date);

        dispatch(updateActiveMessageList(updatedMessages));
        setMessages(updatedMessages);
      });

      return () => unsubscribe();
    }
  }, [conversationId]);

  return messages;
};

export const useUser = (documentId: string) => {
  const [documentData, setDocumentData] = useState(null);
  const [isOnline, setOnline] = useState<boolean>(false);

  useEffect(() => {
    // Get a reference to the document
    const userRef = doc(FIREBASE.db, COLLECTION.USER, documentId);

    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = {
          id: doc.id,
          ...doc.data(),
          modifiedAt: FIREBASE.utils.formatDate(doc.data().modifiedAt),
        } as any;

        setDocumentData(data);
        setOnline(data.online);
      } else {
        throw new Error("No such document!");
      }
    });

    // return a cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [documentId]);

  return [isOnline, documentData];
};
