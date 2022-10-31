import { useContext, useState } from "react";
import Bingo from "../../store/bingo";
import styles from "./Chat.module.css";
import { sendValidationAnswer } from "../../pages/api/firebase";

const ValidationItem = (props) => {
  const [answered, setAnswered] = useState(false);
  const bingoCtx = useContext(Bingo);
  const validHandler = (valid) => {
    sendValidationAnswer(props.keyword.id, bingoCtx.name, valid);
    setAnswered(true);
  };

  return (
    <li className={styles.validation}>
      <h2>{props.keyword.keyword}</h2>
      <button disabled={answered} onClick={() => validHandler(true)}>
        ✔
      </button>
      <button disabled={answered} onClick={() => validHandler(false)}>
        ✖
      </button>
    </li>
  );
};

export default ValidationItem;
