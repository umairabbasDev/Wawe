/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { StorageReference, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FIREBASE from "../App";
import { singleRef } from "../App/types";


// Function to fetch an array of documents based on an array of document references
async function fetchDocumentsByArrayReferences<T>(references: Array<singleRef>): Promise<Array<T>> {
  const documents: Array<T> = [];

  for (const reference of references) {
    const documentSnapshot = await getDoc(reference);
    if (documentSnapshot.exists()) {
      documents.push(documentSnapshot.data() as T); // Use type assertion to ensure data matches type T
    }
  }

  return documents;
}


async function updateDocumentField(
  collectionPath: string,
  documentId: string,
  { key, value }: { key: string; value: string | number }
) {
  const documentRef = doc(FIREBASE.db, collectionPath, documentId);

  try {
    const res: unknown = await updateDoc(documentRef, { [key]: value });
    // console.log(
    //   `Field "${key}" updated successfully for document ${documentId}`
    // );
    return res;
  } catch (error: unknown) {
    throw new Error(`Error updating field "${key}" for document ${documentId}:  ${error}`);
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

async function createDocument(data = {}, collectionName: string) {
  try {
    const docRef = await addDoc(collection(FIREBASE?.db, collectionName), {
      ...data,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    // console.log("Document written with ID: ", docRef);
    return docRef;
  } catch (error: unknown) {
    throw new Error(`Error adding document: ${error}`);
  }
}

async function createDocumentWithCustomID(data = {}, collectionName: string, docId: string) {
  try {
    const docRef = doc(FIREBASE?.db, collectionName, docId);

    const isExist = await doesDocumentExist(collectionName, docId);
    if (isExist) {
      return { isExist, message: "Document already exist" };
    }
    await setDoc(docRef, {
      ...data,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    // console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    throw new Error(`Error adding document: ${e}`);
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

async function uploadStorageFile(conID: string, fileData: Blob | Uint8Array | ArrayBuffer, fileType: string): Promise<{ success: boolean; url: string }> {
  try {
    // Check if fileData is a valid type
    if (!(fileData instanceof Blob || fileData instanceof Uint8Array || fileData instanceof ArrayBuffer)) {
      throw new Error('Invalid fileData type. It must be a Blob, Uint8Array, or ArrayBuffer.');
    }

    const filePath = FIREBASE.utils.createFilePAth(conID, fileType);
    const storageRef: StorageReference = ref(FIREBASE.storage, filePath);

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, fileData);

    // Get the download URL of the uploaded file
    const downloadURL: string = await getDownloadURL(ref(FIREBASE.storage, filePath));

    // File uploaded successfully, return the downloadURL
    return { success: true, url: downloadURL };
  } catch (error: any) {
    // Handle errors and rethrow with a more descriptive message
    throw new Error(`Error uploading file: ${error.message}`);
  }
}


async function deleteDocument(docId: string, collectionName: string) {
  try {
    await deleteDoc(doc(FIREBASE.db, collectionName, docId));
    // console.log("Document with ID", docId, "deleted successfully");
  } catch (e) {
    throw new Error(`Error deleting document: ${e}`);
  }
}



async function getWholeCollection(name: string) {
  try {

    const querySnapshot = await getDocs(collection(FIREBASE.db, name));
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }


  } catch (error) {
    console.log(error);
  }

}




export {
  createDocument,
  createDocumentWithCustomID,
  fetchDocumentsByArrayReferences,
  updateDocumentField,
  getDocumentByRef,
  uploadStorageFile,
  deleteDocument,
  getWholeCollection
};
