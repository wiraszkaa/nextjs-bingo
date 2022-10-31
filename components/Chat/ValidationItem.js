import { useContext, useEffect, useState } from "react";
import { database } from "../../pages/api/firebase";
import { ref, get } from "firebase/database";
import Bingo from "../../store/bingo";
import styles from "./Chat.module.css";
import { sendValidationAnswer } from "../../pages/api/firebase";

const ValidationItem = (props) => {
  const [answered, setAnswered] = useState(false);
  const [valid, setValid] = useState(false);
  const bingoCtx = useContext(Bingo);

  useEffect(() => {
    const dbRef = ref(database, `bingo/answers/${props.keyword.id}`);
    get(dbRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        for (const name in data) {
          if (name === bingoCtx.name) {
            setAnswered(true);
            setValid(data[name]);
            return;
          }
        }
      }
    });
  }, []);

  const validHandler = (valid) => {
    if (valid) {
      setValid(true);
    }
    sendValidationAnswer(props.keyword, bingoCtx.name, valid);
    setAnswered(true);
  };

  return (
    <li
      className={`${styles.validation} ${
        answered ? (valid ? "valid" : "invalid") : ""
      }`}
    >
      <h2>{props.keyword.keyword}</h2>
      <button
        className="valid"
        disabled={answered}
        onClick={() => validHandler(true)}
      >
        ✔
      </button>
      <button
        className="invalid"
        disabled={answered}
        onClick={() => validHandler(false)}
      >
        ✖
      </button>
    </li>
  );
};

export default ValidationItem;
