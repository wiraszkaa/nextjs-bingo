import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  update,
  get,
  child,
  set,
} from "firebase/database";

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     databaseURL: process.env.DATABASE_URL,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
// };

// // const app = !getApps().length ? initializeApp( firebaseConfig ) : getApp();
// const app = initializeApp( firebaseConfig );

const firebaseConfig = {
  apiKey: "AIzaSyAM_YqZCjDyW_tYrbp6XxYQ-6hQbD_rJ3A",
  authDomain: "bingo-e5095.firebaseapp.com",
  databaseURL:
    "https://bingo-e5095-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bingo-e5095",
  storageBucket: "bingo-e5095.appspot.com",
  messagingSenderId: "661741471839",
  appId: "1:661741471839:web:8d613a76f7d8c5709ab3ea",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const addValidation = (keyword) => {
  const dbRef = ref(database, "bingo/chat");
  get(child(dbRef, `${keyword.id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return;
    }
    set(child(dbRef, `${keyword.id}`), { type: "validation", keyword });
  });
};

export const sendValidationAnswer = (id, name, answer) => {
  const dbRef = ref(database, `bingo/answers/${id}/${name}`);
  set(dbRef, answer);
};

export const addMessage = (message) => {
  const dbRef = ref(database, "bingo/chat");
  const newMessageRef = push(dbRef);
  update(newMessageRef, {
    ...message,
    type: "message",
  });
};

export const sendWin = (name, currentGame) => {
    const dbRef = ref(database, `bingo/${currentGame}`);
    set(child(dbRef, `${name}`), { win: true });
};

export const login = (name) => {
    const dbRef = ref(database, "bingo/users");
    set(child(dbRef, `${name}`), { name });
};
