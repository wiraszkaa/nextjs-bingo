import { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { database } from "../../pages/api/firebase";
import { onValue, ref } from "firebase/database";
import ValidationItem from "./ValidationItem";
import ChatItem from "./ChatItem";
import Input from "./Input";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const chatRef = ref(database, "bingo/chat");
    return onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const messages = [];
      for (const key in data) {
        messages.push({
          id: key,
          ...data[key],
        });
      }
      setMessages(messages);
    });
  }, []);

  let content = messages.map((message) => {
    if (message.type === "validation") {
      return <ValidationItem key={message.id} keyword={message.keyword} />;
    }
    return <ChatItem key={message.id} message={message} />;
  });

  return (
    <div className={styles.main}>
      <h1>Chat</h1>
      <div className={styles.chat}>
        <ul>{content}</ul>
      </div>
      <Input />
    </div>
  );
};

export default Chat;
