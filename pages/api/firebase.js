import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  update,
  get,
  child,
  set,
  remove,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const addValidation = (keyword) => {
  const dbRef = ref(database, "bingo/chat/validations");
  get(dbRef).then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      for (const key in data) {
        if (data[key].id === keyword.id) {
          return;
        }
      }
    }
    const newValidationRef = push(dbRef);
    update(newValidationRef, {
      ...keyword,
    });
  });
};

export const sendValidationAnswer = (keyword, name, answer) => {
  const dbRef = ref(database, `bingo/answers/${keyword.id}/${name}`);
  set(dbRef, answer);
};

export const addMessage = (message) => {
  const dbRef = ref(database, "bingo/chat/messages");
  const newMessageRef = push(dbRef);
  update(newMessageRef, {
    ...message,
  });
};

export const sendWin = (name, currentGame) => {
  get(child(ref(database), `bingo/wins/${currentGame}`)).then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      set(ref(database, `bingo/wins/${currentGame}/${data.length}`), name);
    } else {
      set(ref(database, `bingo/wins/${currentGame}/0`), name);
    }
  });
  set(ref(database, `bingo/games/${currentGame}/${name}/win`), true);
};

export const setCorrect = (id, valid) => {
  const dbRef = ref(database, `bingo/correct/${id}`);
  set(dbRef, { valid });
};

export const removeValidation = (id) => {
  const dbRef = ref(database, `bingo/chat/validations`);
  get(dbRef).then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      for (const key in data) {
        if (data[key].id === id) {
          remove(child(dbRef, key));
          return;
        }
      }
    }
  });
};

export const removeAnswers = (id) => {
  const dbRef = ref(database, `bingo/answers/${id}`);
  remove(dbRef);
};

export const sendKeywords = (name, currentGame, keywords) => {
  const dbRef = ref(database, `bingo/games/${currentGame}/${name}/keywords`);
  set(dbRef, keywords);
};

export const sendSelected = (name, currentGame, selected) => {
  const dbRef = ref(database, `bingo/games/${currentGame}/${name}/selected`);
  set(dbRef, selected);
};
