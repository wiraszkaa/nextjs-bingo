import { useState, useContext, useEffect } from "react";
import { database, addValidation } from "../../pages/api/firebase";
import { onValue, ref } from "firebase/database";
import Bingo from "../../store/bingo";
import styles from "./BingoTable.module.css";

const Cell = (props) => {
  const { id } = props.keyword;
  const [selected, setSelected] = useState(false);
  const [valid, setValid] = useState(false);
  const bingoCtx = useContext(Bingo);

  useEffect(() => {
    const selectedData = JSON.parse(
      localStorage.getItem("" + bingoCtx.currentGame)
    );
    if (selectedData) {
      setSelected(
        selectedData[props.keyword.row - 1][props.keyword.column - 1] > 0
      );
    }
  }, []);

  useEffect(() => {
    const chatRef = ref(database, `bingo/correct/${id}`);
    return onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        return;
      }
      if (data.valid) {
        setValid(true);
      } else {
        setSelected(false);
        bingoCtx.select(props.keyword, 0);
        setValid(false);
      }
    });
  }, [id]);

  const selectHandler = () => {
    if (selected) {
      setSelected(false);
      bingoCtx.select(props.keyword, 0);
    } else {
      setSelected(true);
      bingoCtx.select(props.keyword, 1);
      addValidation(props.keyword, bingoCtx.name, bingoCtx.ip);
    }
  };

  if (selected && valid) {
    bingoCtx.select(props.keyword, 2);
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
