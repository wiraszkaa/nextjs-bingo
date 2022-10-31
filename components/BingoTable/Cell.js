import { useState, useContext, useEffect } from "react";
import { database, addValidation } from "../../pages/api/firebase";
import { onValue, ref } from "firebase/database";
import Bingo from "../../store/bingo";
import styles from "./BingoTable.module.css";

const Cell = (props) => {
  const [selected, setSelected] = useState(false);
  const [valid, setValid] = useState(false);
  const bingoCtx = useContext(Bingo);

  useEffect(() => {
    const chatRef = ref(database, `bingo/correct/${props.keyword.id}`);
    return onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setValid(true);
      }
    });
  }, []);

  const selectHandler = () => {
    setSelected(true);
    addValidation(props.keyword);
  };

  if (selected && valid) {
    bingoCtx.select(props.keyword);
  }

  return (
    <button
      style={{
        gridColumn: `${props.keyword.column} / ${props.keyword.column + 1}`,
        gridRow: `${props.keyword.row} / ${props.keyword.row + 1}`,
      }}
      className={`${styles.cell} ${
        selected && valid ? styles.active : selected ? styles.selected : ""
      }`}
      onClick={selectHandler}
    >
      <span>{props.keyword.keyword}</span>
    </button>
  );
};

export default Cell;
