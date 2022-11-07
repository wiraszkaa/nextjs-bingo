import { useState, useEffect } from "react";
import useCountdown from "../../hooks/use-countdown";
import { database } from "../../pages/api/firebase";
import { onValue, ref } from "firebase/database";
import styles from "./AdminPanel.module.css";
import {
  setCorrect,
  removeValidation,
  removeAnswers,
} from "../../pages/api/firebase";

const KeywordItem = (props) => {
  const { id } = props.keyword;
  const [valid, setValid] = useState(false);
  const [answers, setAnswers] = useState({ valid: 0, invalid: 0 });
  const [days, hours, minutes, seconds] = useCountdown(props.keyword.time);

  useEffect(() => {
    const answersRef = ref(database, `bingo/answers/${id}`);
    return onValue(answersRef, (snapshot) => {
      const data = snapshot.val();
      let valid = 0;
      let invalid = 0;
      for (const answer in data) {
        if (data[answer]) {
          valid++;
        } else {
          invalid++;
        }
      }
      setAnswers({ valid, invalid });
    });
  }, [id]);

  useEffect(() => {
    if (seconds <= 0 && !valid) {
      if (answers.valid === 0 && answers.invalid === 0) {
        correctHandler(true);
      } else if (answers.valid > answers.invalid) {
        correctHandler(true);
      } else {
        correctHandler(false);
      }
    }
  }, [seconds]);

  const correctHandler = (valid) => {
    setCorrect(props.keyword.id, valid);
    if (!valid) {
      removeValidation(props.keyword.id);
      removeAnswers(props.keyword.id);
    } else {
      setValid(true);
    }
  };

  return (
    <div className={`${styles.keyword} ${valid ? styles.valid : ""}`}>
      <h1>{props.keyword.keyword}</h1>
      <p>{props.keyword.name}</p>
      {seconds >= 0 && <p>{`${minutes}:${seconds}`}</p>}
      <button
        disabled={valid}
        onClick={() => correctHandler(true)}
        className="valid"
      >
        ✔ {answers.valid}
      </button>
      <button onClick={() => correctHandler(false)} className="invalid">
        ✖ {answers.invalid}
      </button>
    </div>
  );
};

export default KeywordItem;
