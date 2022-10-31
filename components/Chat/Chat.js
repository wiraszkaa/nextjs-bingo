import { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { database } from "../../pages/api/firebase";
import { onValue, ref } from "firebase/database";
import ValidationItem from "./ValidationItem";
import ChatItem from "./ChatItem";
import Input from "./Input";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [validations, setValidations] = useState([]);
  useEffect(() => {
    const chatRef = ref(database, "bingo/chat");
    return onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMessages([]);
        setValidations([]);
        return;
      }
      const messages = [];
      if (data.messages) {
        for (const key in data.messages) {
          messages.push({
            id: key,
            ...data.messages[key],
          });
        }
        setMessages(messages);
      } else {
        setMessages([]);
      }
      if (data.validations) {
        const validations = [];
        for (const key in data.validations) {
          validations.push({
            key,
            ...data.validations[key],
          });
        }
        setValidations(validations);
      } else {
        setValidations([]);
      }
    });
  }, []);

  return (
    <div className={styles.main}>
      <h1>Chat</h1>
      <div className={styles.chat}>
        <ul>
          {validations.map((validation) => (
            <ValidationItem key={validation.id} request={validation.key} keyword={validation} />
          ))}
        </ul>
      </div>
      <div className={styles.chat}>
        <ul>
          {messages.map((message) => (
            <ChatItem key={message.id} message={message} />
          ))}
        </ul>
      </div>
      <Input />
    </div>
  );
};

export default Chat;
