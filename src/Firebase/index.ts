import { COLLECTION, UsersFirebase } from "./App/types";
import Firebase from './App'
import { createDocument, } from "./lib";
import {
  createUserWithEmailAndPassword, GoogleAuthProvider,
  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup
} from 'firebase/auth'
import { AuthStateContext } from "../context/Auth";

type StateDispatch = React.Dispatch<React.SetStateAction<Pick<AuthStateContext, "status" | "userId">>>
interface PropsRegister {
  email: string
  password: string
}

const googleProvider = new GoogleAuthProvider()



const Auth = {
  register: async (data: UsersFirebase) => { return await createDocument(data, COLLECTION.USER); },
  user: async (data: UsersFirebase) => { return await createDocument(data, COLLECTION.USER); }
}


const book = {
  upload: async () => {
    try {
      console.log("uploading file... ");

    } catch (error) {
      console.error("Messages delete  : ", error);
    }
  },

  remove: async () => {
    try {
      console.log("remove file... ");

    } catch (error) {
      console.error("Messages delete  : ", error);
    }
  }

  ,
  list: async () => {
    try {
      console.log("fetching file list... ");

    } catch (error) {
      console.error("Messages delete  : ", error);
    }
  }

}


const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(Firebase.Auth, googleProvider)
    const { displayName, email, photoURL, uid } = result.user
    console.log(displayName, email, photoURL);

    return uid
  } catch (e) {
    alert((e as Error).message)
  }
}


const signInWithCredentials = async ({ email, password }: PropsRegister) => {

  try {
    const resp = await createUserWithEmailAndPassword(Firebase.Auth, email, password);

    return resp.user.uid

  } catch (e) {
    alert((e as Error).message)
  }

}

const loginWithCredentials = async ({ email, password }: PropsRegister) => {

  try {
    const resp = await signInWithEmailAndPassword(Firebase.Auth, email, password);

    return resp.user.uid

  } catch (e) {

    alert((e as Error).message)
  }
}




const onAuthStateHasChanged = (setSession: StateDispatch) => {
  onAuthStateChanged(Firebase.Auth, user => {

    if (!user) return setSession({ status: 'no-authenticated', userId: null })

    setSession({ status: 'authenticated', userId: user!.uid })
  })
}

const logoutFirebase = async () => await Firebase.Auth.signOut()





export { Auth, book, singInWithGoogle, logoutFirebase, onAuthStateHasChanged, signInWithCredentials, loginWithCredentials };
