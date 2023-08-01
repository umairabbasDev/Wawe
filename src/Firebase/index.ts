import { doc } from "firebase/firestore";
import FIREBASE, {
  COLLECTION,
  Conversations,
  Message,
  MessageType,
  singleRef,
  UsersFirebase,
} from "./App";
import {
  createDocument,
  createDocumentWithCustomID,
  deleteDocument,
  getDocumentsByArrayFieldValue,
  updateDocumentField,
} from "./lib";

// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });

/**
 * collection name: Users
 *
 * *** Data structure
 * avatarUrl
 * createdAt
 * email
 * name
 * online
 *
 */

// const data: UsersFirebase = {
//   avatarUrl: "",
//   email: "",
//   name: "",
//   mobileNo: 213123123,
//   online: true,
// };

const data: any = {
  conversationId: "string",
  senderUid: "string",
  recipientUid: "string",
  messageType: MessageType.text,
  messageData: "string",
  readBy: null,
};

const createUser = async (data: UsersFirebase) => {
  let newUserData = { ...data, modifiedAt: new Date() };

  return await createDocumentWithCustomID(
    newUserData,
    COLLECTION.USER,
    data.mobileNo as string
  );
};

// TODO: extend the type accordingly 
// const createConversation = async (data: Conversations) => {
  const createConversation = async (data: any) => {
  // ider data craete ker k bejo
  const finalData = {
    lastMessage: null,
    participants: data?.participants.map((item: any) =>
      doc(FIREBASE.db, COLLECTION.USER, item)
    ),
  };

  return await createDocumentWithCustomID(
    finalData,
    COLLECTION.CONVERSATION,
    data.id
  );
};

const createMessage = async (data: Message) => {
  let messageType: string = "";
  if (data.messageData.includes("image")) {
    messageType = "image";
  } else if (data.messageData.includes("audio")) {
    messageType = "audio";
  } else if (data.messageData.includes("doc")) {
    messageType = "document";
  } else if (data.messageData.includes("video")) {
    messageType = "video";
  } else if (data.messageData.includes("card")) {
    messageType = "card";
  } else {
    messageType = "text";
  }

  let newData = {
    ...data,
    senderUid: doc(FIREBASE.db, COLLECTION.USER, data?.senderUid),
    recipientUid: doc(FIREBASE.db, COLLECTION.USER, data?.recipientUid),
    conversationId: doc(
      FIREBASE.db,
      COLLECTION.CONVERSATION,
      data?.conversationId
    ),
    messageType,
  };

  return await createDocument(newData, COLLECTION.MESSAGE);
};

function deleteMessage(docId: string, conID: singleRef) {
  try {
    // console.log("con id", conID?.path);

    deleteDocument(docId, COLLECTION.MESSAGE).then((res) => {
      updateDocumentField(COLLECTION.CONVERSATION, conID?.id, {
        key: "lastMessage",
        value: null,
      }).then(() => {
        console.info("Message deleted successfully ");
        return res;
      });
    });
  } catch (error) {
    console.error("Messages delete  : ", error);
  }
}

const getAllConversations = async (number: string) =>
  await getDocumentsByArrayFieldValue(
    { key: "participants", value: `${COLLECTION.USER}/${number}` },
    COLLECTION.CONVERSATION
  );

const conversation = {
  update: {
    lastMessage: async (docId: string, updatedValue: singleRef) => {
      // const lastMsgRef= doc(FIREBASE.db, COLLECTION.MESSAGE, data?.updatedValue)
      return await updateDocumentField(COLLECTION.CONVERSATION, docId, {
        key: "lastMessage",
        value: updatedValue,
      });
    },
  },
};

const user = {
  update: {
    online: (docId: string, updatedValue: boolean) => {
      updateDocumentField(COLLECTION.USER, docId, {
        key: "modifiedAt",
        value: new Date(),
      })
        .then((res: unknown) => {
          console.info(`modifiedAt is ${updatedValue}`);
          // return rs;
        })
        .catch((e) => {
          // console.error(e);
          console.error(`USER unable update modifiedAt `);
        });

      updateDocumentField(COLLECTION.USER, docId, {
        key: "online",
        value: updatedValue,
      })
        .then((isOnline: unknown) => {
          console.info(`user is ${updatedValue}`);
          return isOnline;
        })
        .catch((e) => {
          // console.error(e);
          console.error(`USER unable online `);
        });
    },
  },
};

// { key: "participants", value: `${COLLECTION.USER}/${number}` },
// COLLECTION.CONVERSATION

const addMobileNumbers = (numberOne, numberTwo) => {
  return Number(numberOne) + Number(numberTwo);
};

export {
  createUser,
  getAllConversations,
  createMessage,
  conversation,
  user,
  createConversation,
  addMobileNumbers,
  deleteMessage,
};
