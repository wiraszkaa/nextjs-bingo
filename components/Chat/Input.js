import { useContext, useRef } from "react";
import styles from "./Chat.module.css";
import Bingo from "../../store/bingo";
import { addMessage } from "../../pages/api/firebase";

const Input = () => {
  const inputRef = useRef();
  const bingoCtx = useContext(Bingo);

  const sendHandler = () => {
    const message = inputRef.current.value;
    if (message) {
      addMessage({ text: message, author: bingoCtx.name });
      inputRef.current.value = "";
    }
  };

  return (
    <div className={styles.input}>
      <input ref={inputRef} type="text" />
      <button onClick={sendHandler}>Send</button>
    </div>
  );
};

export default Input;
