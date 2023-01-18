import {initializeApp} from "firebase/app"
import { getFirestore } from "firebase/firestore"


// console.log(process.env.REACT_APP_apiKey)
const firebaseConfig = {
    

    apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_databaseURL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
    storageBucket:process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
    messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
    appId:process.env.NEXT_PUBLIC_FIREBASE_appId,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
}


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export default app